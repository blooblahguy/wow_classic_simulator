function show_div(box, div) {
	if (document.getElementById(box).checked === true) {
		document.getElementById(div).style.display = "block";
	} else {
		document.getElementById(div).style.display = "none";
	}
}

function unique_checkboxes(clicked_box, list_of_boxes) {
	for (let box of list_of_boxes) {
		if (document.getElementById(box).checked) {
			document.getElementById(box).checked = false;
		}
	}
	document.getElementById(clicked_box).checked = true;
}

function unique_checkboxes_unselect(clicked_box, list_of_boxes) {
	for (let box of list_of_boxes) {
		document.getElementById(box).checked = false;
	}
}

function unique_div(divs_to_show, divs_to_hide) {
	for (let div_to_show of divs_to_show) {
		document.getElementById(div_to_show).style.display = "block";
	}
	for (let div_to_hide of divs_to_hide) {
		document.getElementById(div_to_hide).style.display = "none";
	}
}

let coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		// remove active from other collapsibles even after hiding them
		var others = document.getElementsByClassName("collapsible");
		for (var i = 0; i < others.length; i++) {
			if (others.item(i) !== this) {
				others.item(i).classList.remove("active");
			}
		}

		this.classList.toggle("active");
		let content = this.nextElementSibling;
		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block";
		}
		for (let j = 0; j < coll.length; j++) {
			if (coll[j] !== this) {
				let other_content = coll[j].nextElementSibling;
				other_content.style.display = "none";
			}
		}
	});
}

function open_armor() {
	document.getElementById("armor_n_wep").click();
}

let world_buffs = ["rallying_cry", "dire_maul", "slipkiks_savy", "songflower", "warchiefs_blessing",
	"spirit_of_zandalar", "sayges_fortune", "traces_of_silithyst"];
let world_buffs_input = [];

let buffs = ["battle_shout", "blessing_of_kings", "blessing_of_might", "gift_of_the_wild", "leader_of_the_pack", "trueshot_aura",
	"windfury_totem", "strength_of_earth_totem", "grace_of_air_totem"];
let buffs_input = [];

let consumables = ["elixir_mongoose", "blessed_sunfruit", "smoked_dessert_dumplings", "juju_power",
	"elixir_of_giants", "winterfall_firewater", "juju_might", "roids", "dense_stone_main_hand",
	"elemental_stone_main_hand", "dense_stone_off_hand", "elemental_stone_off_hand",
	"consecrated_sharpening_stone_main_hand", "consecrated_sharpening_stone_off_hand",
	"battle_shout_aq", "blessing_of_might_aq", "fire_toasted_bun", "strength_of_earth_totem_aq",
	"grace_of_air_totem_aq", "improved_weapon_totems", "enhancing_totems"];
let consumables_input = [];

let armor = ["helmet_dd", "neck_dd", "shoulder_dd", "back_dd",
	"chest_dd", "wrists_dd", "hands_dd", "belt_dd", "legs_dd",
	"boots_dd", "ring1_dd", "ring2_dd", "trinket1_dd", "trinket2_dd", "ranged_dd"];
let armor_input = [];

let weapons = ["main_hand_dd", "off_hand_dd", "two_hand_dd"];
let weapons_input = [];

let armor_mult = ["helmet_dd_mult", "neck_dd_mult", "shoulder_dd_mult", "back_dd_mult",
	"chest_dd_mult", "wrists_dd_mult", "hands_dd_mult", "belt_dd_mult", "legs_dd_mult",
	"boots_dd_mult", "ring_dd_mult", "trinket_dd_mult", "ranged_dd_mult"];
let armor_input_mult = [];

let weapons_mult = ["weapons_dd_mult", "two_hand_weapons_dd_mult"];
let weapons_input_mult = [];

let enchants = ["helmet_ench_dd", "shoulder_ench_dd", "back_ench_dd", "chest_ench_dd", "wrist_ench_dd",
	"hands_ench_dd", "legs_ench_dd", "boots_ench_dd", "main_hand_ench_dd", "off_hand_ench_dd"];
let enchant_prefixes = ["e", "s", "b", "c", "w", "h", "l", "b", "m", "o"];
let enchants_input = [];

let float_options = ["n_simulations_dd", "n_simulations_stat_dd", "n_simulations_talent_dd",
	"opponent_level_dd", "boss_armor_dd", "fight_time_dd",
	"sunder_armor_dd", "heroic_strike_rage_thresh_dd", "cleave_rage_thresh_dd", "whirlwind_rage_thresh_dd",
	"whirlwind_bt_cooldown_thresh_dd", "overpower_rage_thresh_dd", "overpower_bt_cooldown_thresh_dd",
	"overpower_ww_cooldown_thresh_dd", "hamstring_cd_thresh_dd", "initial_rage_dd", "hamstring_thresh_dd",
	"max_optimize_time_dd", "number_of_extra_targets_dd", "extra_target_armor_dd", "extra_target_level_dd",
	"periodic_damage_interval_dd", "periodic_damage_amount_dd", "execute_phase_percentage_dd",
	"re_queue_abilities_dd", "stat_weight_skill_dd", "stat_weight_mh_speed_dd", "stat_weight_oh_speed_dd",
	"slam_spam_max_time_dd", "slam_cd_thresh_dd", "slam_spam_rage_dd", "slam_rage_dd", "berserking_haste_dd",
	"full_polarity_dd", "extra_target_duration_dd", "battle_squawk_dd"];

let sim_options = ["faerie_fire", "exposed_armor", "curse_of_recklessness", "death_wish", "enable_blood_fury",
	"enable_berserking", "recklessness", "mighty_rage_potion", "debug_on", "use_bt_in_exec_phase", "use_hs_in_exec_phase",
	"cleave_if_adds", "use_hamstring", "use_bloodthirst", "use_whirlwind", "use_overpower", "use_heroic_strike",
	"item_strengths", "wep_strengths", "deep_wounds", "heroic_strike_aq", "compute_dpr", "talents_stat_weights",
	"multi_target_mode", "essence_of_the_red", "periodic_damage", "can_trigger_enrage", "first_global_sunder",
	"ability_queue", "first_hit_heroic_strike", "use_slam", "use_ms_in_exec_phase", "use_mortal_strike",
	"use_sweeping_strikes", "dont_use_hm_when_ss", "fungal_bloom", "full_polarity", "battle_squawk"];

let stat_weigths = ["stat_weight_hit", "stat_weight_crit", "stat_weight_haste",
	"stat_weight_extra_hit", "stat_weight_skill", "stat_weight_mh_speed", "stat_weight_oh_speed"];

let race;
let race_string;

function string_is_armor(string) {
	for (let armor_string of armor) {
		if (string === armor_string) {
			return true;
		}
	}
	return false;
}

function string_is_weapon(string) {
	for (let weapon_string of weapons) {
		if (string === weapon_string) {
			return true;
		}
	}
	return false;
}

let compare_armor_input = [];
let compare_weapons_input = [];

function load_compare_data() {
	let file = document.getElementById("myCompareFile");
	let myFile = file.files[0];
	if (myFile !== undefined) {
		let reader = new FileReader();
		reader.readAsText(myFile);
		reader.onload = function () {
			compare_armor_input = [];
			compare_weapons_input = [];
			let rawLog = reader.result;
			let splitlog = rawLog.split("\n");
			for (let item of splitlog) {
				let dd_name = item.split(" ");
				if (string_is_armor(dd_name[0])) {
					compare_armor_input.push(dd_name[1]);
				} else if (string_is_weapon(dd_name[0])) {
					compare_weapons_input.push(dd_name[1]);
				}
			}
			// console.log(compare_armor_input);
		}
	}
}

function load_file() {
	let file = document.getElementById("myFile");
	let myFile = file.files[0];
	let reader = new FileReader();

	//set all buff-values to unchecked before loading
	for (let world_buff of world_buffs) {
		document.getElementById(world_buff).checked = false;
	}
	for (let buff of buffs) {
		document.getElementById(buff).checked = false;
	}
	for (let consumable of consumables) {
		document.getElementById(consumable).checked = false;
	}
	for (let stat_weight of stat_weigths) {
		document.getElementById(stat_weight).checked = false;
	}
	for (let sim_option of sim_options) {
		document.getElementById(sim_option).checked = false;
	}

	reader.readAsText(myFile);
	reader.onload = function () {
		let rawLog = reader.result;
		let splitlog = rawLog.split("\n");
		for (let item of splitlog) {
			let dd_name = item.split(" ");
			// console.log(dd_name[0]);
			if (dd_name.length === 2) {
				// console.log(dd_name[1]);
				selectElement(dd_name[0], dd_name[1])
			} else {
				// console.log(dd_name[1] + " " + dd_name[2]);
				selectElement(dd_name[0], dd_name[1] + " " + dd_name[2])
			}
		}
	};
	setTimeout(displayTalentBootup, 200);
	setTimeout(calcTotalTalents, 200);
}

function save_button() {
	read_inputs();
	let file_content = "";
	for (let i = 0; i < armor.length; i++) {
		file_content += armor[i] + " " + armor_input[i] + "\n";
	}
	for (let i = 0; i < weapons.length; i++) {
		file_content += weapons[i] + " " + weapons_input[i] + "\n";
	}
	let all_dropdowns = armor_mult.concat(weapons_mult);
	for (let dropdown of all_dropdowns) {
		let select_menu = document.getElementById(dropdown);
		for (let i = 0; i < select_menu.length; i++) {
			let item = select_menu[i];
			file_content += item.value;
			file_content += item.selected ? " true\n" : " false\n";
		}
	}
	for (let i = 0; i < enchants.length; i++) {
		let dd_string = enchants_input[i].slice(1, enchants_input[i].length);
		file_content += enchants[i] + " " + dd_string + "\n";
	}
	for (let i = 0; i < world_buffs.length; i++) {
		file_content += world_buffs[i] + " " + world_buffs_input[i] + "\n";
	}
	for (let i = 0; i < buffs.length; i++) {
		file_content += buffs[i] + " " + buffs_input[i] + "\n";
	}
	for (let i = 0; i < consumables.length; i++) {
		file_content += consumables[i] + " " + consumables_input[i] + "\n";
	}

	for (let variable of float_options) {
		file_content += variable + " " + parseFloat(document.getElementById(variable).value) + "\n";
	}

	for (let variable of stat_weigths) {
		if (document.getElementById(variable).checked) {
			file_content += variable + " " + variable + "\n";
		}
	}

	for (let variable of talents_vec) {
		file_content += variable + " " + document.getElementById(variable).getAttribute("data-count") + "\n";
	}

	for (let variable of sim_options) {
		if (document.getElementById(variable).checked) {
			file_content += variable + " " + variable + "\n";
		}
	}

	file_content += "race_dd" + " " + race_string + "\n";

	let uriContent = "data:application/octet-stream," + encodeURIComponent(file_content);
	saveAs(uriContent, "wow-fury-sim-config.txt")
}

function saveAs(uri, filename) {
	let link = document.createElement('a');
	if (typeof link.download === 'string') {
		document.body.appendChild(link); // Firefox requires the link to be in the body
		link.download = filename;
		link.href = uri;
		link.click();
		document.body.removeChild(link); // remove the link when done
	} else {
		location.replace(uri);
	}
}

function openTab(evt, cityName) {
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
}

function read_inputs() {
	race = document.getElementById("race_dd");
	race_string = race.options[race.selectedIndex].value;

	world_buffs_input = [];
	for (let world_buff of world_buffs) {
		let temp = document.getElementById(world_buff);
		world_buffs_input.push((temp.checked) ? world_buff : "");
	}
	buffs_input = [];
	for (let buff of buffs) {
		let temp = document.getElementById(buff);
		buffs_input.push((temp.checked) ? buff : "");
	}
	consumables_input = [];
	for (let consumable of consumables) {
		let temp = document.getElementById(consumable);
		consumables_input.push((temp.checked) ? consumable : "");
	}

	armor_input = [];
	for (let armor_piece of armor) {
		let temp = document.getElementById(armor_piece);
		armor_input.push(temp.options[temp.selectedIndex].value);
	}

	weapons_input = [];
	for (let i = 0; i < weapons.length; i++) {
		let temp = document.getElementById(weapons[i]);
		if (temp.selectedIndex === -1) {
			weapons_input.push("none");
		} else {
			weapons_input.push(temp.options[temp.selectedIndex].value);
		}
	}

	armor_input_mult = [];
	for (let armor_piece of armor_mult) {
		let multi_select = document.getElementById(armor_piece);
		for (let i = 0; i < multi_select.options.length; i++) {
			if (multi_select.options[i].selected) {
				armor_input_mult.push(multi_select.options[i].value);
			}
		}
	}

	weapons_input_mult = [];
	for (let weapon_id of weapons_mult) {
		let multi_select = document.getElementById(weapon_id);
		for (let i = 0; i < multi_select.options.length; i++) {
			if (multi_select.options[i].selected) {
				weapons_input_mult.push(multi_select.options[i].value);
			}
		}
	}

	enchants_input = [];
	for (let i = 0; i < enchants.length; i++) {
		let temp = document.getElementById(enchants[i]);
		enchants_input.push(enchant_prefixes[i] + temp.options[temp.selectedIndex].value);
	}
}

let bar_chart_auras;
let bar_chart_proc;
let bar_chart_damage;
let line_chart_hist;
let line_chart_fight;
let line_chart_fight_cum;
let bar_chart_cooldowns;

function clean_charts() {
	try {
		bar_chart_auras.destroy();
		bar_chart_proc.destroy();
		bar_chart_damage.destroy();
		line_chart_hist.destroy();
		line_chart_fight.destroy();
		line_chart_fight_cum.destroy();
		bar_chart_cooldowns.destroy();
	} catch (error) {
		console.log(error)
	}
}

function show_loader() {
	$("#loader").addClass("loader");
}

function hide_loader() {
	$("#loader").removeClass("loader");
}

async function run_sim(event) {
	show_loader();
	setTimeout(setup_simulation_context, 100);
	setTimeout(hide_loader, 100);
	event.preventDefault();
}

function setup_simulation_context() {

	clean_charts();
	read_inputs();

	let armor_vec = new Module.StringList();
	for (let armor_piece of armor_input) {
		armor_vec.push_back(armor_piece);
	}

	let weapons_vec = new Module.StringList();
	if (document.getElementById("two_hand_mode").checked) {
		weapons_vec.push_back(weapons_input[2]);
	} else {
		weapons_vec.push_back(weapons_input[0]);
		weapons_vec.push_back(weapons_input[1]);
	}

	let compare_armor_vec = new Module.StringList();
	let compare_weapons_vec = new Module.StringList();
	if (document.getElementById("do_comparison").checked) {
		if (compare_armor_input.length === 15) {
			for (let armor_piece of compare_armor_input) {
				compare_armor_vec.push_back(armor_piece);
			}
		}
		if (compare_weapons_input.length === 2) {
			for (let wep of compare_weapons_input) {
				compare_weapons_vec.push_back(wep);
			}
		}
	}

	let mult_armor_vec = new Module.StringList();
	let mult_weapons_vec = new Module.StringList();
	if (document.getElementById("multiple_mode").checked) {
		for (let armor_piece of armor_input_mult) {
			if (armor_piece !== "none") {
				mult_armor_vec.push_back(armor_piece);
			}
		}
		for (let wep of weapons_input_mult) {
			if (wep !== "none") {
				mult_weapons_vec.push_back(wep);
			}
		}
	}

	let buff_vec = new Module.StringList();
	for (let buff of world_buffs_input) {
		buff_vec.push_back(buff);
	}
	for (let buff of buffs_input) {
		buff_vec.push_back(buff);
	}
	for (let buff of consumables_input) {
		buff_vec.push_back(buff);
	}
	let ench_vec = new Module.StringList();
	for (let ench of enchants_input) {
		ench_vec.push_back(ench);
	}

	let options = new Module.StringList();
	for (let val of sim_options) {
		if (document.getElementById(val).checked) {
			options.push_back(val);
		}
	}

	let race_vec = new Module.StringList();
	race_vec.push_back(race_string);

	let float_options_string = new Module.StringList();
	let float_options_val = new Module.vectorDouble();
	for (let option of float_options) {
		let element = document.getElementById(option);
		let val = parseFloat(element.value);
		if (isNaN(val)) {
			val = 0;
		}
		val = Math.min(Math.max(val, element.min), element.max);
		float_options_string.push_back(option);
		float_options_val.push_back(val);
	}

	let talent_string = new Module.StringList();
	let talent_val = new Module.vectorInt();
	for (let talent of talents_vec) {
		let element = document.getElementById(talent);
		let val = parseFloat(element.getAttribute("data-count"));
		let max_val = parseFloat(element.getAttribute("data-max"));
		if (isNaN(val)) {
			console.log("NaN value when reading talents.");
			val = 0;
		}
		if (val > 0) {
			console.log(element, val);
		}
		val = Math.min(Math.max(val, 0), max_val);
		talent_string.push_back(talent);
		talent_val.push_back(val);
	}

	let n_simulations = parseInt(document.getElementById("n_simulations_dd").value);
	let n_simulations_stat = parseInt(document.getElementById("n_simulations_stat_dd").value);
	let n_simulations_talent = parseInt(document.getElementById("n_simulations_talent_dd").value);
	let total_simulations = n_simulations;
	if (document.getElementById("do_comparison").checked) {
		total_simulations *= 2;
	}
	if (document.getElementById("talents_stat_weights").checked) {
		total_simulations += n_simulations_talent * 9;
	}
	let need_to_add_for_ap = true;
	let stat_weight_vec = new Module.StringList();
	for (let stat_weight of stat_weigths) {
		if (document.getElementById(stat_weight).checked) {
			console.log(stat_weight.slice(12, stat_weight.length));
			stat_weight_vec.push_back(stat_weight.slice(12, stat_weight.length));
			total_simulations += n_simulations_stat * 2 + n_simulations_stat * 2 * need_to_add_for_ap;
			need_to_add_for_ap = false;
		}
	}

	let obj = new Module['Sim_interface']();

	if (document.getElementById("multiple_mode").checked) {
		let wow_input = {
			race: race_vec,
			armor: mult_armor_vec,
			weapons: mult_weapons_vec,
			buffs: buff_vec,
			enchants: ench_vec,
			options: options,
			float_options_string: float_options_string,
			float_options_val: float_options_val,
			talent_string: talent_string,
			talent_val: talent_val,
		};

		let result = obj.simulate_mult(wow_input);
		document.getElementById("output1").innerHTML = result['messages'].get(0);
		document.getElementById("output2").innerHTML = "";
		if (document.getElementById("display_multi_debug").checked) {
			document.getElementById("output2").innerHTML = result['messages'].get(1);
		}
		document.getElementById("output3").innerHTML = "";
		document.getElementById("output4").innerHTML = "";

	} else {
		let wow_input = {
			race: race_vec,
			armor: armor_vec,
			weapons: weapons_vec,
			buffs: buff_vec,
			enchants: ench_vec,
			stat_weights: stat_weight_vec,
			options: options,
			float_options_string: float_options_string,
			float_options_val: float_options_val,
			talent_string: talent_string,
			talent_val: talent_val,
			compare_armor: compare_armor_vec,
			compare_weapons: compare_weapons_vec,
			mult_armor: mult_armor_vec,
		};

		let result = obj.simulate(wow_input);

		obj.delete();

		let mean_dps = [];
		let std_dps = [];
		for (let i = 0; i < result['mean_dps'].size(); i++) {
			mean_dps.push(result['mean_dps'].get(i).toFixed(2));
			std_dps.push(result['std_dps'].get(i).toFixed(2));
		}

		let n_sim_status = "";
		if (mean_dps.length === 1) {
			let conf_interval = 1.96 * std_dps[0];
			n_sim_status += 'DPS: <b>' + mean_dps[0] + ' &plusmn ' + conf_interval.toPrecision(3) + '</b> (95% confidence interval)<br>';
		} else {
			for (let i = 0; i < mean_dps.length; i++) {
				let j = i + 1;
				let conf_interval = 1.96 * std_dps[i];
				n_sim_status += 'DPS setup' + j + ': <b>' + mean_dps[i] + ' &plusmn ' +
					conf_interval.toPrecision(3) + '</b> (95% confidence interval)<br>';
			}
		}

		n_sim_status += "Simulations for DPS = <b>" + n_simulations + "</b><br>" +
			"Simulations for stat weights = <b>" + (total_simulations - n_simulations) +
			"</b><br>Total simulations: <b>" + total_simulations + "</b><br> ";
		if (!document.getElementById("debug_on").checked) {
			n_sim_status += "(Hint: Combat logs can be activated in 'Simulation settings')"
		}

		document.getElementById("output1").innerHTML = n_sim_status;

		document.getElementById("output3").innerHTML = result['messages'].get(0);

		let stat_weights = [];
		if (result['stat_weights'].size() > 0) {
			let ap_string = result['stat_weights'].get(0);
			ap_string = ap_string.split(" ");
			let p_val_p = parseFloat(ap_string[1]) + 1.96 * parseFloat(ap_string[2]);
			let p_val_n = parseFloat(ap_string[1]) - 1.96 * parseFloat(ap_string[2]);
			let n_val_p = parseFloat(ap_string[3]) - 1.96 * parseFloat(ap_string[4]);
			let n_val_n = parseFloat(ap_string[3]) + 1.96 * parseFloat(ap_string[4]);
			stat_weights.push({
				'name': "100 AP",
				'value_max': Math.max(p_val_p, p_val_n),
				'value_min': Math.min(p_val_p, p_val_n),
				'negative_value_max': Math.max(n_val_p, n_val_n),
				'negative_value_min': Math.min(n_val_p, n_val_n)
			});
			let dps_per_ap = parseFloat(ap_string[1]) / 100;
			for (let i = 1; i < result['stat_weights'].size(); i++) {
				let stat_string = result['stat_weights'].get(i);
				stat_string = stat_string.split(" ");
				let p_val_p = (parseFloat(stat_string[1]) + 1.96 * parseFloat(stat_string[2])) / dps_per_ap;
				let p_val_n = (parseFloat(stat_string[1]) - 1.96 * parseFloat(stat_string[2])) / dps_per_ap;
				let n_val_p = (parseFloat(stat_string[3]) - 1.96 * parseFloat(stat_string[4])) / dps_per_ap;
				let n_val_n = (parseFloat(stat_string[3]) + 1.96 * parseFloat(stat_string[4])) / dps_per_ap;
				stat_weights.push({
					'name': stat_string[0],
					'value_max': Math.max(p_val_p, p_val_n),
					'value_min': Math.min(p_val_p, p_val_n),
					'negative_value_max': Math.max(n_val_p, n_val_n),
					'negative_value_min': Math.min(n_val_p, n_val_n)
				});
			}
		}

		let string = "<b>Stat weights:</b> <br />";
		if (document.getElementById("do_comparison").checked) {
			string = "<b>Stat weights (Setup 1):</b> <br />";
		}
		string += "(Accuracy is based on the 'number of simulations per stat weight' value.)<br>";
		if (result['stat_weights'].size() > 0) {
			string += "+" + stat_weights[0]['name'] + " equivalates: <b>" + stat_weights[0]['value_min'].toFixed(2) +
				" &#8722 " + stat_weights[0]['value_max'].toFixed(2) + "</b> DPS. <br />";
			if (stat_weights[0]['name'] !== '1%ExtraAttack') {
				string += "-" + stat_weights[0]['name'] + " equivalates: <b>" + stat_weights[0]['negative_value_min'].toFixed(2) +
					" &#8722 " + stat_weights[0]['negative_value_max'].toFixed(2) + "</b> DPS. <br />";
			}
			string += "<br />";

			for (let i = 1; i < stat_weights.length; i++) {
				string += "+" + stat_weights[i]['name'] + " equivalates: <b>" + stat_weights[i]['value_min'].toFixed(2) +
					" &#8722 " + stat_weights[i]['value_max'].toFixed(2) + "</b> attack power. <br />";
				if (stat_weights[i]['name'] !== '1%ExtraAttack') {
					string += "-" + stat_weights[i]['name'] + " equivalates: <b>" + stat_weights[i]['negative_value_min'].toFixed(2) +
						" &#8722 " + stat_weights[i]['negative_value_max'].toFixed(2) + "</b> attack power. <br />";
				}
				string += "<br />";
			}
		}
		document.getElementById("output2").innerHTML = string;

		// Crit cap details:
		document.getElementById("output4").innerHTML = result['extra_stats'].get(0);

		if (document.getElementById("debug_on").checked) {
			document.getElementById("combat_debug").style.display = "block";
			document.getElementById("combat_debug_title").innerHTML = "<b>Combat log from the median fight: </b>";
		} else {
			document.getElementById("combat_debug").style.display = "none";
			document.getElementById("combat_debug_title").innerHTML = "";
		}
		document.getElementById("combat_debug").innerHTML = result['extra_stats'].get(1);

		let aura_name = [];
		let aura_uptimes = [];
		for (let i = 0; i < result['aura_uptimes'].size(); i++) {
			let aura_string = result['aura_uptimes'].get(i);
			let split_string = aura_string.split(" ");
			aura_name.push(split_string[0]);
			aura_uptimes.push(parseFloat(split_string[1]));
		}

		let aura_list = [];
		for (let j = 0; j < aura_name.length; j++)
			aura_list.push({'name': aura_name[j], 'duration': aura_uptimes[j]});

		aura_list.sort(function (a, b) {
			return ((a.duration > b.duration) ? -1 : ((a.duration === b.duration) ? 0 : 1));
		});

		for (let k = 0; k < aura_list.length; k++) {
			aura_name[k] = aura_list[k].name;
			aura_uptimes[k] = aura_list[k].duration;
		}

		let proc_list = [];
		let proc_name = [];
		let proc_counter = [];
		for (let i = 0; i < result['proc_counter'].size(); i++) {
			let proc_string = result['proc_counter'].get(i);
			let split_string = proc_string.split(" ");
			proc_list.push({'name': split_string[0], 'counter': parseFloat(split_string[1])});
		}

		proc_list.sort(function (a, b) {
			return ((a.counter > b.counter) ? -1 : ((a.counter === b.counter) ? 0 : 1));
		});

		for (let k = 0; k < proc_list.length; k++) {
			proc_name[k] = proc_list[k].name;
			proc_counter[k] = proc_list[k].counter;
		}

		let colors = ["#3e95cd", "#8e5ea2", "#FFFF00", "#c45850",
			"#e8c3b9", "#990099", "#145A32", "#3333cc",
			"#c45000", "#00FF08", "#FF000A", "#ffffff",
			"#abc46b", "#f75fff", "#5cffeb", "#beff5b"];
		let damage_name = [];
		let damage_vec = [];
		for (let i = 0; i < result["time_lapse_names"].size(); i++) {
			damage_name.push(result["time_lapse_names"].get(i));
			damage_vec.push([]);
			let damage_source_vec = result["damage_time_lapse"].get(i);
			if (i === 0) {
				for (let j = 0; j < damage_source_vec.size(); j++) {
					damage_vec[i].push(damage_source_vec.get(j));
				}
			} else {
				for (let j = 0; j < damage_source_vec.size(); j++) {
					damage_vec[i].push(damage_source_vec.get(j) + damage_vec[i - 1][j]);
				}
			}
		}

		let cumulative_vec = [];
		for (let i = 0; i < result["time_lapse_names"].size(); i++) {
			cumulative_vec.push([]);
			cumulative_vec[i][0] = damage_vec[i][0];
			for (let j = 1; j < damage_vec[i].length; j++) {
				cumulative_vec[i].push(cumulative_vec[i][j - 1] + damage_vec[i][j]);
			}
		}

		let sources = [];
		for (let i = 0; i < result["time_lapse_names"].size(); i++) {
			sources.push(mean_dps[0] * result['dmg_sources'].get(i));
		}

		let time_stamps = [];
		time_stamps.push(0);
		for (let j = 1; j < damage_vec[0].length; j++) {
			time_stamps.push(time_stamps[j - 1] + .50);
		}

		let hist_x = [];
		let hist_y = [];
		for (let i = 0; i < result['hist_x'].size(); i++) {
			hist_x.push(result['hist_x'].get(i));
			hist_y.push(result['hist_y'].get(i));
		}

		let data_damage_time_lapse = [];
		for (let i = 0; i < damage_vec.length; i++) {
			data_damage_time_lapse.push(
				{
					data: damage_vec[i],
					label: damage_name[i],
					borderWidth: 10,
					borderColor: colors[i],
					backgroundColor: colors[i],
					pointRadius: 0.1,
					fill: origin
				}
			)
		}

		let data_damage_time_lapse_cum = [];
		for (let i = 0; i < damage_vec.length; i++) {
			data_damage_time_lapse_cum.push(
				{
					data: cumulative_vec[i],
					label: damage_name[i],
					borderWidth: 10,
					borderColor: colors[i],
					backgroundColor: colors[i],
					pointRadius: 0.1,
					fill: origin
				}
			)
		}

		let use_effect_data = [];
		for (let i = result['use_effect_order_string'].size() - 1; i >= 0; i--) {
			let aura_string = result['use_effect_order_string'].get(i);
			let split_string = aura_string.split(" ");
			let use_effect_name = split_string[0];
			let start_time = parseFloat(split_string[1]);
			let duration = parseFloat(split_string[2]);
			let found_effect = false;
			for (let use_effect of use_effect_data) {
				if (use_effect['name'] === use_effect_name) {
					let sum_times = 0.0;
					for (let previous_start_time of use_effect['start_time']) {
						if (previous_start_time + duration >= 0.0) {
							sum_times += previous_start_time + duration;
						}
					}
					// use_effect['start_time'].push(delta_start_time);
					use_effect['start_time'].push(start_time - sum_times);
					found_effect = true;
				}
			}
			if (!found_effect) {
				use_effect_data.push(
					{
						'name': use_effect_name,
						'start_time': [start_time],
						'duration': duration,
					}
				);
			}
		}
		let longest_data_set = 0;
		let n_data_set = use_effect_data.length;
		for (let use_effect of use_effect_data) {
			if (use_effect['start_time'].length > longest_data_set) {
				longest_data_set = use_effect['start_time'].length;
			}
		}
		let use_effect_plot = [];
		let use_effect_colors = [];
		let use_effect_labels = [];
		for (let i = 0; i < 2 * longest_data_set; ++i) {
			use_effect_plot.push([]);
			use_effect_colors.push([]);
		}
		for (let i = 0; i < n_data_set; ++i) {
			use_effect_labels.push(use_effect_data[i]['name']);
			let j = 0;
			let duration = use_effect_data[i]['duration'];
			for (let start_time of use_effect_data[i]['start_time']) {
				if (start_time < 0.0) {
					if (duration + start_time < 0.0) {
						use_effect_plot[j].push(start_time + duration);
						use_effect_plot[j + 1].push(-duration);
						use_effect_colors[j].push("rgba(255,255,250,0)");
						use_effect_colors[j + 1].push(colors[i]);
					} else {
						use_effect_plot[j].push(start_time);
						use_effect_plot[j + 1].push(duration + start_time);
						use_effect_colors[j].push(colors[i]);
						use_effect_colors[j + 1].push(colors[i]);
					}
				} else {
					use_effect_plot[j].push(start_time);
					use_effect_plot[j + 1].push(duration);
					use_effect_colors[j].push("rgba(255,255,250,0)");
					use_effect_colors[j + 1].push(colors[i]);
				}
				j += 2;
			}
			while (j < 2 * longest_data_set) {
				use_effect_plot[j].push(0);
				use_effect_plot[j + 1].push(0);
				use_effect_colors[j].push("rgba(255,255,250,0)");
				use_effect_colors[j + 1].push("rgba(255,255,250,0)");
				j += 2;
			}
		}

		let use_effect_datasets = [];
		for (let i = 0; i < use_effect_plot.length; i++) {
			use_effect_datasets.push(
				{
					'data': use_effect_plot[i],
					'backgroundColor': use_effect_colors[i]
				}
			)
		}

		Chart.defaults.global.defaultFontSize = 36;
		Chart.defaults.global.defaultFontStyle = 'Bold';
		Chart.defaults.scale.gridLines.color = "black";

		line_chart_hist = new Chart(document.getElementById("line-chart-hist"), {
			type: 'line',
			data: {
				labels: hist_x,
				datasets: [{
					data: hist_y,
					label: "Simulator results",
					borderWidth: 10,
					borderColor: "#3e95cd",
					fill: origin,
					backgroundColor: "#3e95cd"
				}]
			},
			options: {
				legend: {
					labels: {
						fontColor: "black",
					}
				},
				title: {
					fontSize: 60,
					fontColor: "black",
					display: true,
					text: 'Damage histogram'
				},
				scales: {
					yAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0.5)",
						},
						ticks: {
							fontColor: "black",
						},
						scaleLabel: {
							display: true,
							labelString: 'Frequency',
							fontColor: "black",
						}
					}],
					xAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0.5)",
						},
						ticks: {
							fontColor: "black",
							maxTicksLimit: 30,
							maxRotation: 0
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: 'DPS'
						}
					}]
				}
			}
		});

		let canvas = document.getElementById("line-chart-hist");
		canvas.maintainAspectRatio = true;
		canvas.style.height = '450px';
		canvas.style.width = '675px';

		line_chart_fight = new Chart(document.getElementById("line-chart-fight"), {
			type: 'line',
			data: {
				labels: time_stamps,
				datasets: data_damage_time_lapse
			},
			options: {
				legend: {
					labels: {
						fontColor: "black",
					}
				},
				bezierCurve: false,
				title: {
					fontSize: 60,
					fontColor: "black",
					display: true,
					text: 'Fight time lapse (DPS)'
				},
				scales: {
					yAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						ticks: {
							fontColor: "black",
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: 'Average damage'
						}
					}],
					xAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						ticks: {
							autoSkip: true,
							maxTicksLimit: 30,
							maxRotation: 0,
							fontColor: "black",
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: 'Time'
						}
					}],
				}
			}
		});

		canvas = document.getElementById("line-chart-fight");
		canvas.maintainAspectRatio = true;
		canvas.responsive = false;
		canvas.style.height = '450px';
		canvas.style.width = '675px';

		line_chart_fight_cum = new Chart(document.getElementById("line-chart-fight-cumulative"), {
			type: 'line',
			data: {
				labels: time_stamps,
				datasets: data_damage_time_lapse_cum
			},
			options: {
				legend: {
					labels: {
						fontColor: "black",
					}
				},
				title: {
					fontSize: 60,
					fontColor: "black",
					display: true,
					text: 'Fight time lapse'
				},
				scales: {
					yAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: 'Cumulative damage'
						},
						ticks: {
							fontColor: "black",
						},
					}],
					xAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						ticks: {
							fontColor: "black",
							maxTicksLimit: 30,
							maxRotation: 0
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: 'Time'
						}
					}]
				}
			}
		});

		canvas = document.getElementById("line-chart-fight-cumulative");
		canvas.maintainAspectRatio = true;
		canvas.style.height = '450px';
		canvas.style.width = '675px';

		bar_chart_cooldowns = new Chart(document.getElementById("bar-chart-cooldowns").getContext("2d"), {
			type: 'horizontalBar',
			data: {
				labels: use_effect_labels,
				datasets: use_effect_datasets
			},
			options: {
				legend: {display: false},
				title: {
					fontSize: 60,
					fontColor: "black",
					display: true,
					text: 'Use Effect Schedule'
				},
				scales: {
					yAxes: [{
						stacked: true,
						fontColor: "black",
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: 'Use Effect'
						},
						ticks:
							{
								fontColor: "black",
								beginAtZero: true,
								suggestedMin: 0,
							}
					}],
					xAxes: [{
						stacked: true,
						fontColor: "black",
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: 'Time'
						},
						ticks:
							{
								fontColor: "black",
								beginAtZero: true,
								suggestedMin: 0,
							}
					}]
				}
			}
		});

		canvas = document.getElementById("bar-chart-cooldowns");
		canvas.maintainAspectRatio = true;
		canvas.responsive = false;
		canvas.style.height = '450px';
		canvas.style.width = '675px';

		// Bar chart
		bar_chart_damage = new Chart(document.getElementById("bar-chart-damage"), {
			type: 'bar',
			data: {
				labels: damage_name,
				datasets: [
					{
						backgroundColor: colors,
						data: sources
					}
				]
			},
			options: {
				legend: {display: false},
				title: {
					fontSize: 60,
					fontColor: "black",
					display: true,
					text: 'DPS from different sources'
				},
				scales: {
					yAxes: [{
						fontColor: "black",
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: 'DPS'
						},
						ticks:
							{
								fontColor: "black",
								beginAtZero: true,
								suggestedMin: 0,
							}
					}],
					xAxes: [{
						fontColor: "black",
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							fontColor: "black",
							display: false,
						},
						ticks:
							{
								fontColor: "black",
								beginAtZero: true,
								suggestedMin: 0,
							}
					}]
				}
			}
		});

		canvas = document.getElementById("bar-chart-damage");
		canvas.maintainAspectRatio = true;
		canvas.style.height = '450px';
		canvas.style.width = '675px';

		// Bar chart
		bar_chart_auras = new Chart(document.getElementById("bar-chart-auras"), {
			type: 'bar',
			data: {
				labels: aura_name,
				datasets: [
					{
						backgroundColor: colors,
						data: aura_uptimes
					}
				]
			},
			options: {
				legend: {display: false},
				title: {
					fontColor: "black",
					fontSize: 60,
					display: true,
					text: 'Aura uptime'
				},
				scales: {
					yAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
							labelString: '%',
						},
						ticks:
							{
								fontColor: "black",
								beginAtZero: true,
								suggestedMin: 0,
							}
					}],
					xAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						ticks:
							{
								fontColor: "black",
								beginAtZero: true,
							}
					}],
				}
			}
		});

		canvas = document.getElementById("bar-chart-auras");
		canvas.maintainAspectRatio = true;
		canvas.style.height = '450px';
		canvas.style.width = '675px';

		// Bar chart
		bar_chart_proc = new Chart(document.getElementById("bar-chart-proc"), {
			type: 'bar',
			data: {
				labels: proc_name,
				datasets: [
					{
						backgroundColor: colors,
						data: proc_counter
					}
				]
			},
			options: {
				legend: {display: false},
				title: {
					fontColor: "black",
					fontSize: 60,
					display: true,
					text: 'Average # of procs'
				},
				scales: {
					yAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						scaleLabel: {
							fontColor: "black",
							display: true,
						},
						ticks:
							{
								fontColor: "black",
								beginAtZero: true,
							}
					}],
					xAxes: [{
						gridLines: {
							fontColor: "black",
							color: "rgba(0, 0, 0, 0)",
						},
						ticks:
							{
								fontColor: "black",
								beginAtZero: true,
							}
					}],
				}
			}
		});

		canvas = document.getElementById("bar-chart-proc");
		canvas.maintainAspectRatio = true;
		canvas.responsive = false;
		canvas.style.height = '450px';
		canvas.style.width = '675px';
	}
}