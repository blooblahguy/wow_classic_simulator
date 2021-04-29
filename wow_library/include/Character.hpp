#ifndef WOW_SIMULATOR_CHARACTER_HPP
#define WOW_SIMULATOR_CHARACTER_HPP

#include "Armory.hpp"
#include "Item.hpp"

#include <algorithm>
#include <cassert>
#include <iostream>
#include <vector>

enum class Race
{
    human,
    dwarf,
    night_elf,
    gnome,
    orc,
    tauren,
    troll,
    undead
};

class Character
{
public:
    Character(const Race& race, int level);

    void equip_armor(const Armor& piece) { armor.emplace_back(piece); }

    void equip_weapon(std::vector<Weapon> weapon_vec)
    {
        if (weapon_vec.size() == 1)
        {
            equip_weapon(weapon_vec[0]);
        }
        else if (weapon_vec.size() == 2)
        {
            equip_weapon(weapon_vec[0], weapon_vec[1]);
        }
        else
        {
            std::cout << "ERROR: trying to equip weapon vec of size: " << weapon_vec.size() << "\n";
        }
    }

    void equip_weapon(Weapon weapon)
    {
        if (weapon.weapon_socket != Weapon_socket::two_hand)
        {
            std::cout << "WARN: Wielding single weapon that is not two handed.\n";
        }
        weapon.socket = Socket::main_hand;
        weapons.emplace_back(weapon);
    }

    void equip_weapon(Weapon weapon1, Weapon weapon2)
    {
        if (weapon1.weapon_socket == Weapon_socket::two_hand || weapon2.weapon_socket == Weapon_socket::two_hand)
        {
            std::cout << "Cant dual wield with a two-hand.";
            assert(false);
        }
        weapon1.socket = Socket::main_hand;
        weapon2.socket = Socket::off_hand;
        weapons.emplace_back(weapon1);
        weapons.emplace_back(weapon2);
    }

    void add_enchant(const Socket socket, const Enchant::Type type)
    {
        for (auto& wep : weapons)
        {
            if (socket == wep.socket)
            {
                wep.enchant = Enchant{type};
                return;
            }
        }
        for (auto& item : armor)
        {
            if (socket == item.socket)
            {
                item.enchant = Enchant{type};
                return;
            }
        }
    }

    void add_buff(const Buff& buff) { buffs.emplace_back(buff); }

    void add_weapon_buff(const Socket socket, const Weapon_buff& buff)
    {
        for (auto& wep : weapons)
        {
            if (socket == wep.socket)
            {
                wep.buff = buff;
                return;
            }
        }
    }

    bool is_dual_wield() const { return weapons.size() == 2; }

    bool has_weapon_of_type(Weapon_type weapon_type) const
    {
        return std::any_of(weapons.cbegin(), weapons.cend(),
                           [&](const Weapon& wep) { return wep.type == weapon_type; });
    }

    bool has_item(const std::string& item_name) const
    {
        for (const auto& armor_piece : armor)
        {
            if (armor_piece.name == item_name)
            {
                return true;
            }
        }
        for (const auto& wep : weapons)
        {
            if (wep.name == item_name)
            {
                return true;
            }
        }
        return false;
    }

    Armor get_item_from_socket(const Socket socket, bool first_slot = true)
    {
        for (const auto& armor_piece : armor)
        {
            if (armor_piece.socket == socket)
            {
                if (first_slot)
                {
                    return armor_piece;
                }
                first_slot = true; // Take the next item
            }
        }
        std::cout << "Error did not find item in socket: " << socket << "\n";
        return armor[0];
    }

    template <typename T>
    void equip_and_replace(const T& piece_to_equip, const Socket socket, bool first_misc_slot = false)
    {
        if constexpr (std::is_same_v<decltype(piece_to_equip), Armor>)
        {
            equip_and_replace_armor(piece_to_equip, first_misc_slot);
            return;
        }
        if constexpr (std::is_same_v<decltype(piece_to_equip), Weapon>)
        {
        equip_and_replace_weapon(piece_to_equip, socket);
            return;
        }
    }

    void equip_and_replace_armor(const Armor& piece_to_equip, bool first_misc_slot = false)
    {
        auto socket = piece_to_equip.socket;
        for (auto& armor_piece : armor)
        {
            if (armor_piece.socket == socket)
            {
                if (socket == Socket::ring || socket == Socket::trinket)
                {
                    if (first_misc_slot)
                    {
                        armor_piece = piece_to_equip;
                        return;
                    }
                    first_misc_slot = true; // Will trigger on the second hit instead
                }
                else
                {
                    // Reuse the same enchant
                    auto enchant = armor_piece.enchant;
                    armor_piece = piece_to_equip;
                    armor_piece.enchant = enchant;
                    return;
                }
            }
        }
    }

    void equip_and_replace_weapon(const Weapon& weapon_to_equip, const Socket socket)
    {
        if (weapon_to_equip.weapon_socket == Weapon_socket::two_hand)
        {
            Weapon& current_wep = weapons[0];
            Weapon weapon_copy = weapon_to_equip;
            weapon_copy.buff = current_wep.buff;
            weapon_copy.enchant = current_wep.enchant;
            weapon_copy.socket = socket;
            current_wep = weapon_copy;
        }
        else
        {
            Weapon& current_wep = (socket == Socket::main_hand) ? weapons[0] : weapons[1];
            Weapon weapon_copy = weapon_to_equip;
            weapon_copy.buff = current_wep.buff;
            weapon_copy.enchant = current_wep.enchant;
            weapon_copy.socket = socket;
            current_wep = weapon_copy;
        }
    }

    Weapon get_weapon_from_socket(const Socket socket)
    {
        for (const auto& wep : weapons)
        {
            if (wep.socket == socket)
            {
                return wep;
            }
        }
        std::cout << "Error did not find item in socket: " << socket << "\n";
        return weapons[0];
    }

    struct
    {
        bool booming_voice_talent{false};
        int improved_battle_shout_talent{0};
        int sword_specialization{0};
        int one_handed_weapon_specialization{0};
    } talents;

    Attributes base_attributes;
    Attributes total_attributes;
    Special_stats base_special_stats;
    Special_stats total_special_stats;
    Special_stats talent_special_stats;
    std::vector<Armor> armor;
    std::vector<Weapon> weapons;
    std::vector<Buff> buffs;
    std::vector<Set_bonus> set_bonuses;
    std::vector<Use_effect> use_effects;
    Race race;
    int level;
};

Character character_setup(const Armory& armory, const std::string& race, const std::vector<std::string>& armor_vec,
                          const std::vector<std::string>& weapons_vec, const std::vector<std::string>& buffs_vec,
                          const std::vector<std::string>& talent_string, const std::vector<int>& talent_val,
                          const std::vector<std::string>& ench_vec);

Race get_race(const std::string& race);

Character get_character_of_race(const std::string& race);

std::ostream& operator<<(std::ostream& os, const Character& character);

#endif // WOW_SIMULATOR_CHARACTER_HPP
