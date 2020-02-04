#ifndef WOW_SIMULATOR_CHARACTER_HPP
#define WOW_SIMULATOR_CHARACTER_HPP

#include <cassert>
#include <vector>
#include "Stats.hpp"
#include "Item.hpp"
#include "Enchant.hpp"

enum class Race
{
    human,
    dwarf,
    night_elf,
    gnome
};

class Character
{
public:
    enum class Talent
    {
        fury,
        none,
    };

    explicit Character(const Race &race);

    void compute_all_stats(Talent talent);

    bool check_if_gear_valid();

    const Special_stats &get_total_special_stats() const;

    int get_weapon_skill() const;

    const std::vector<Armor> &get_gear() const;

    const std::vector<Weapon> &get_weapons() const;

    double get_haste() const;

    const Stats &get_stats() const;


    template<typename T, typename ...Ts>
    void equip_armor(T piece, Ts ...pieces)
    {
        equip_armor(piece);
        equip_armor(pieces...);
    }

    template<typename T>
    void equip_armor(T piece)
    {
        armor_.emplace_back(piece);
    }

    template<typename T, typename ...Ts>
    void equip_weapon(T piece, Ts ...pieces)
    {
        equip_weapon(piece);
        equip_weapon(pieces...);
    }

    template<typename T>
    void equip_weapon(T piece)
    {
        weapons_.emplace_back(piece);
    }

    template<typename T, typename ...Ts>
    void add_enchants(T en, Ts ...ens)
    {
        add_enchants(en);
        add_enchants(ens...);
    }

    template<typename T>
    void add_enchants(T piece)
    {
        enchants_.emplace_back(piece);
    }

    double get_chance_for_extra_hit() const;

    void set_stats(const Stats &stats);

    void set_total_special_stats(const Special_stats &total_special_stats);

    void set_haste(double haste);

    void set_chance_for_extra_hit(double chance_for_extra_hit);

    void set_weapon_skill(int weapon_skill);

    bool is_crusader_mh() const;

    bool is_crusader_oh() const;

    template<typename T>
    auto &get_field(T t)
    {
        return (*this).*t;
    }

    void clear_permutations()
    {
        permutated_stats_ = Stats{};
        permutated_special_stats_ = Special_stats{};
    }

    // Used to compute
    Stats permutated_stats_;
    Special_stats permutated_special_stats_;

private:
    Stats base_stats_;
    Special_stats base_special_stats_;
    Stats total_stats_;
    Special_stats total_special_stats_;
    double haste_;
    bool crusader_mh_;
    bool crusader_oh_;
    int weapon_skill_;
    std::vector<Armor> armor_;
    std::vector<Weapon> weapons_;
    std::vector<Enchant> enchants_;
    double chance_for_extra_hit_;
};

#endif //WOW_SIMULATOR_CHARACTER_HPP
