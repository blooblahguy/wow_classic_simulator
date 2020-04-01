#ifndef WOW_SIMULATOR_COMBAT_SIMULATOR_HPP
#define WOW_SIMULATOR_COMBAT_SIMULATOR_HPP

#include <vector>
#include <iostream>
#include <cassert>
#include <map>
#include <cmath>
#include <iomanip>
#include <random>

#include "Character.hpp"
#include "damage_sources.hpp"

class Weapon_sim
{
public:
    Weapon_sim(double swing_speed, std::pair<double, double> damage_interval,
               Socket socket, Weapon_type skill_type);

    double step(double time, double attack_power, bool is_random);

    constexpr double swing(double attack_power)
    {
        return average_damage_ + attack_power * swing_speed_ / 14;
    }

    double random_swing(double attack_power)
    {
        double damage = damage_interval_.first + (damage_interval_.second - damage_interval_
                .first) * static_cast<double>(rand()) / RAND_MAX
                        + attack_power * swing_speed_ / 14;
        return damage;
    }

    double random_normalized_swing(double attack_power)
    {
        return damage_interval_.first + (damage_interval_.second - damage_interval_
                .first) * static_cast<double>(rand()) / RAND_MAX
               + attack_power * normalized_swing_speed_ / 14;
    }

    constexpr double normalized_swing(double attack_power)
    {
        // TODO random damage?
        return average_damage_ + attack_power * normalized_swing_speed_ / 14;
    }

    void reset_timer();

    constexpr void compute_weapon_damage(double bonus_damage)
    {
        damage_interval_.first += bonus_damage;
        damage_interval_.second += bonus_damage;
        average_damage_ = (damage_interval_.second + damage_interval_.first) / 2;
    }

    constexpr double get_average_damage()
    {
        return average_damage_;
    }

    constexpr double get_swing_speed()
    {
        return swing_speed_;
    }

    constexpr double get_internal_swing_timer()
    {
        return internal_swing_timer_;
    }

    Socket get_socket() const;

    Weapon_type get_weapon_type() const
    {
        return weapon_type_;
    }

    void set_internal_swing_timer(double internal_swing_timer);

private:
    double swing_speed_;
    double normalized_swing_speed_;
    double internal_swing_timer_;
    std::pair<double, double> damage_interval_;
    double average_damage_;
    Socket socket_;
    Weapon_type weapon_type_;
};

class Time_keeper
{
public:
    Time_keeper() = default;

    void increment(double dt)
    {
        blood_thirst_cd -= dt;
        whirlwind_cd -= dt;
        global_cd -= dt;
        crusader_mh_buff_timer -= dt;
        crusader_oh_buff_timer -= dt;
        time_ += dt;
        step_index_++;
    }

    void reset()
    {
        blood_thirst_cd = -1e-10;
        whirlwind_cd = -1e-10;
        global_cd = -1e-10;
        crusader_mh_buff_timer = -1e-10;
        crusader_oh_buff_timer = -1e-10;
        time_ = 0.0;
        step_index_ = 1;
    }

    constexpr double get_dynamic_time_step(double mh_dt,
                                           double oh_dt,
                                           double sim_dt)
    {
        double dt = 100.0;
        if (blood_thirst_cd > 0.0)
        {
            dt = std::min(blood_thirst_cd, dt);
        }
        if (whirlwind_cd > 0.0)
        {
            dt = std::min(whirlwind_cd, dt);
        }
        if (global_cd > 0.0)
        {
            dt = std::min(global_cd, dt);
        }
        if (crusader_mh_buff_timer > 0.0)
        {
            dt = std::min(crusader_mh_buff_timer, dt);
        }
        if (crusader_oh_buff_timer > 0.0)
        {
            dt = std::min(crusader_oh_buff_timer, dt);
        }
        dt = std::min(mh_dt, dt);
        dt = std::min(oh_dt, dt);
        dt = std::min(sim_dt, dt);
        dt += 1e-5;
        dt_ = dt;
        return dt;
    }

    double blood_thirst_cd;
    double whirlwind_cd;
    double global_cd;
    double crusader_mh_buff_timer;
    double crusader_oh_buff_timer;
    double time_;
    double dt_;
    int step_index_;
};

struct Combat_simulator_config
{
    // Combat settings
    int n_batches{};
    double sim_time{};
    int opponent_level{};

    // Simulator settings
    bool enable_rng_melee{false};
    bool enable_spell_rotation{false};
    bool use_heroic_spamm{false};
    bool use_mighty_rage_potion{false};
    bool enable_anger_management{false};
    bool enable_bloodrage{false};
    bool enable_talents{false};
    bool enable_item_chance_on_hit_effects{false};
    bool enable_crusader{false};
    bool enable_death_wish{false};
    bool enable_recklessness{false};
    bool display_combat_debug{false};
    bool use_seed{false};
    int seed{};
    bool fuel_extra_rage{false};
    int extra_rage_interval{};
    int extra_rage_damage_amount{};
};

class Combat_simulator
{
public:
    explicit Combat_simulator(Combat_simulator_config config) : config_(config)
    {
        if (config_.use_seed)
        {
            srand(config_.seed);
        }
    }

    double get_uniform_random(double r_max)
    {
        return rand() * r_max / RAND_MAX;
    }

    enum class Hit_result
    {
        miss,
        dodge,
        glancing,
        crit,
        hit,
        TBD
    };

    enum class Stat
    {
        agility,
        strength,
        crit,
        hit,
        chance_extra_hit,
        haste,
        skill_sword,
        skill_axe,
        skill_mace,
        skill_dagger,
        weapon_damage,
        NONE
        // TODO add more
    };

    enum class Hit_type
    {
        white,
        yellow
    };

    struct Hit_outcome
    {
        Hit_outcome(double damage, Hit_result hit_result) : damage{damage}, hit_result{hit_result} {};

        double damage;
        Hit_result hit_result;
    };

    struct Stat_weight
    {
        Stat_weight(Stat stat) : stat(stat)
        {
            d_dps_plus = 0.0;
            std_d_dps_plus = 0.0;
            d_dps_minus = 0.0;
            std_d_dps_minus = 0.0;
            amount = 0.0;
        };

        Stat_weight(double d_dps_plus, double std_d_dps_plus, double d_dps_minus, double std_d_dps_minus, double amount,
                    Stat stat) : d_dps_plus{d_dps_plus},
                std_d_dps_plus{std_d_dps_plus},
                d_dps_minus{d_dps_minus},
                std_d_dps_minus{std_d_dps_minus},
                amount{amount},
                stat{stat} {};
        double d_dps_plus;
        double std_d_dps_plus;
        double d_dps_minus;
        double std_d_dps_minus;
        double amount;
        Stat stat;
    };

    constexpr double lookup_outcome_mh_white(int case_id)
    {
        switch (case_id)
        {
            case 0:
                return 0.0;
            case 1:
                return 0.0;
            case 2:
                return glancing_factor_mh_;
            case 3:
                return 2.2;
            case 4:
                return 1.0;
            default:
                assert(false);
                return 0.0;
        }
    }

    static constexpr double lookup_outcome_mh_yellow(int case_id)
    {
        switch (case_id)
        {
            case 0:
                return 0.0;
            case 1:
                return 0.0;
            case 2:
                return 2.2;
            case 3:
                return 1.0;
            default:
                assert(false);
                return 0.0;
        }
    }

    constexpr double lookup_outcome_oh(int case_id)
    {
        switch (case_id)
        {
            case 0:
                return 0.0;
            case 1:
                return 0.0;
            case 2:
                return glancing_factor_oh_;
            case 3:
                return 2.2;
            case 4:
                return 1.0;
            default:
                assert(false);
                return 0.0;
        }
    }

    std::vector<double> &simulate(const Character &character);
//
//    template<typename Struct_t, typename Field_t>
//    Stat_weight permute_stat(const Character &character, const Armory& armory, Struct_t struct_t, Field_t field_t, Stat stat, double amount,
//                             double sim_time, int opponent_level, int n_batches, double mean_init,
//                             double sample_std_init);
//
//    template<typename Function_ptr>
//    Combat_simulator::Stat_weight
//    permute_stat(const Character &character,  const Armory& armory, Function_ptr function_ptr,
//                 Combat_simulator::Stat stat, double amount, double sim_time, int opponent_level,
//                 int n_batches, double mean_init, double sample_std_init);

//    std::vector<Combat_simulator::Stat_weight>
//    compute_stat_weights(const Character &character, const Armory &armory,double sim_time, int opponent_level, int n_batches,
//                         double mean_init, double sample_std_init);

    Combat_simulator::Hit_outcome
    generate_hit(double damage, Hit_type hit_type, Socket weapon_hand, bool heroic_strike_active, bool death_wish,
                 bool recklessness_active);

    Combat_simulator::Hit_outcome generate_hit_oh(double damage, bool heroic_strike_active, bool recklessness_active);

    Combat_simulator::Hit_outcome
    generate_hit_mh(double damage, Hit_type hit_type, bool recklessness_active);

    void compute_hit_table(int level_difference, int weapon_skill, Special_stats special_stats, Socket weapon_hand);

    static double average(const std::vector<double> &vec);

    static double standard_deviation(const std::vector<double> &vec, double ave);

    static double variance(const std::vector<double> &vec, double ave);

    static double sample_deviation(double mean, int n_samples);

    static double add_standard_deviations(double std1, double std2);

    const std::vector<double> &get_hit_probabilities_white_mh() const;

    template<typename T>
    double damage_source_std(T field_ptr) const
    {
        std::vector<double> damage_vec;
        damage_vec.reserve(damage_distribution_.size());
        for (const auto &damage_source : damage_distribution_)
        {
            damage_vec.push_back(damage_source.*field_ptr / damage_source.sum_counts());
        }
        double mean_dps = Combat_simulator::average(damage_vec);
        double std_dps = Combat_simulator::standard_deviation(damage_vec, mean_dps);
//        double sample_std_dps = Combat_simulator::sample_deviation(std_dps, damage_vec.size());
        return std_dps;
    }

    void print_damage_distribution() const;

    void print_damage_sources(const std::string &source_name, double source_percent,
                              double source_std, double source_count) const
    {
        std::cout << source_name << std::setw(5) << std::left << std::setprecision(3)
                  << 100 * source_percent << " +- " << std::setw(4) << 100 * source_std << ", casts: "
                  << source_count << "\n";
    }

    template<typename T>
    void print_statement(T t)
    {
        std::cout << std::setprecision(4) << t;
    }

    template<typename... Args>
    void simulator_cout(Args &&... args)
    {
        if (config_.display_combat_debug)
        {
            std::cout << "Time: " << std::setw(8) << std::left << time_keeper_.time_ + time_keeper_.dt_
                      << "s. Loop idx:" << std::setw(4) << time_keeper_.step_index_ << "Event: ";
            __attribute__((unused)) int dummy[] = {0, ((void) print_statement(std::forward<Args>(args)), 0)...};
            std::cout << "\n";
        }
    }

private:
    std::vector<double> hit_probabilities_white_mh_;
    std::vector<double> hit_probabilities_white_oh_;
    std::vector<double> hit_probabilities_yellow_;
    std::vector<double> hit_probabilities_recklessness_mh_;
    std::vector<double> hit_probabilities_recklessness_oh_;
    std::vector<double> hit_probabilities_recklessness_yellow_;
    std::vector<double> hit_probabilities_two_hand_;
    std::vector<double> hit_probabilities_recklessness_two_hand_;
    std::vector<double> batch_damage_{};
    std::vector<Damage_sources> damage_distribution_{};
    double glancing_factor_mh_{};
    double glancing_factor_oh_{};
    double armor_reduction_factor_{};
    Time_keeper time_keeper_{};
    Combat_simulator_config config_;
};

std::ostream &operator<<(std::ostream &os, Combat_simulator::Stat_weight const &stats);

#include "Combat_simulator.tcc"

#endif //WOW_SIMULATOR_COMBAT_SIMULATOR_HPP
