"use strict";

const MAX_STEPS = 15; // max is fill +15

const OPTIONS = [
    { "name": "STR", "mat": "Beast", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u" },
    { "name": "STR %", "mat": "Beast", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "INT", "mat": "Wood", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u" },
    { "name": "INT %", "mat": "Wood", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "VIT", "mat": "Metal", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u" },
    { "name": "VIT %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "AGI", "mat": "Cloth", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u" },
    { "name": "AGI %", "mat": "Cloth", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "DEX", "mat": "Medicine", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u" },
    { "name": "DEX %", "mat": "Medicine", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "Natural HP Regen", "mat": "Metal", "pot": 5, "cost": 25, "cat": "Enhance HP/MP", "type": "a" },
    { "name": "Natural HP Regen %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance HP/MP", "type": "a" },
    { "name": "Natural MP Regen", "mat": "Wood", "pot": 10, "cost": 50, "cat": "Enhance HP/MP", "type": "a" },
    { "name": "Natural MP Regen %", "mat": "Wood", "pot": 20, "cost": 100, "cat": "Enhance HP/MP", "type": "a" },
    { "name": "MaxHP", "mat": "Metal", "pot": 3, "cost": "16.49", "cat": "Enhance HP/MP", "type": "u" },
    { "name": "MaxHP %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance HP/MP", "type": "u" },
    { "name": "MaxMP", "mat": "Wood", "pot": 6, "cost": "33.49", "cat": "Enhance HP/MP", "type": "u" },
    { "name": "ATK", "mat": "Beast", "pot": 3, "cost": "16.49", "cat": "Enhance Attack", "type": "w" },
    { "name": "ATK %", "mat": "Beast", "pot": 10, "cost": 50, "cat": "Enhance Attack", "type": "w" },
    { "name": "MATK", "mat": "Wood", "pot": 3, "cost": "16.49", "cat": "Enhance Attack", "type": "w" },
    { "name": "MATK %", "mat": "Wood", "pot": 10, "cost": 50, "cat": "Enhance Attack", "type": "w" },
    { "name": "Stability %", "mat": "Medicine", "pot": 20, "cost": 100, "cat": "Enhance Attack", "type": "u" },
    { "name": "Physical Pierce %", "mat": "Beast", "pot": 20, "cost": 100, "cat": "Enhance Attack", "type": "w" },
    { "name": "Magic Pierce %", "mat": "Wood", "pot": 20, "cost": 100, "cat": "Enhance Attack", "type": "w" },
    { "name": "DEF", "mat": "Metal", "pot": 3, "cost": "16.49", "cat": "Enhance Defense", "type": "a" },
    { "name": "DEF %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance Defense", "type": "a" },
    { "name": "MDEF", "mat": "Metal", "pot": 3, "cost": "16.49", "cat": "Enhance Defense", "type": "a" },
    { "name": "MDEF %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance Defense", "type": "a" },
    { "name": "Physical Resistance %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance Defense", "type": "a" },
    { "name": "Magical Resistance %", "mat": "Wood", "pot": 10, "cost": 50, "cat": "Enhance Defense", "type": "a" },
    { "name": "Accuracy", "mat": "Medicine", "pot": 10, "cost": 50, "cat": "Enhance Accuracy", "type": "w" },
    { "name": "Accuracy %", "mat": "Medicine", "pot": 20, "cost": 100, "cat": "Enhance Accuracy", "type": "w" },
    { "name": "Dodge", "mat": "Cloth", "pot": 10, "cost": 50, "cat": "Enhance Dodge", "type": "a" },
    { "name": "Dodge %", "mat": "Cloth", "pot": 20, "cost": 100, "cat": "Enhance Dodge", "type": "a" },
    { "name": "ASPD", "mat": "Cloth", "pot": 1, "cost": "1.49", "cat": "Enhance Speed", "type": "u" },
    { "name": "ASPD %", "mat": "Cloth", "pot": 1, "cost": 5, "cat": "Enhance Speed", "type": "u" },
    { "name": "CSPD", "mat": "Medicine", "pot": 1, "cost": "1.49", "cat": "Enhance Speed", "type": "u" },
    { "name": "CSPD %", "mat": "Medicine", "pot": 1, "cost": 5, "cat": "Enhance Speed", "type": "u" },
    { "name": "Critical Rate", "mat": "Mana", "pot": 1, "cost": 5, "cat": "Enhance Critical", "type": "u" },
    { "name": "Critical Rate %", "mat": "Mana", "pot": 1, "cost": 5, "cat": "Enhance Critical", "type": "u" },
    { "name": "Critical Damage", "mat": "Mana", "pot": 3, "cost": "16.49", "cat": "Enhance Critical", "type": "u" },
    { "name": "Critical Damage %", "mat": "Mana", "pot": 10, "cost": 50, "cat": "Enhance Critical", "type": "u" },
    { "name": "% stronger against Fire", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Water", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Wind", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Earth", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Light", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Dark", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "Fire resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a" },
    { "name": "Water resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a" },
    { "name": "Wind resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a" },
    { "name": "Earth resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a" },
    { "name": "Light resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a" },
    { "name": "Dark resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a" },
    { "name": "Ailment Resistance %", "mat": "Mana", "pot": 20, "cost": 100, "cat": "Special Enhancement", "type": "u" },
    { "name": "Guard Power %", "mat": "Mana", "pot": 20, "cost": 100, "cat": "Special Enhancement", "type": "u" },
    { "name": "Guard Rate %", "mat": "Mana", "pot": 20, "cost": 100, "cat": "Special Enhancement", "type": "u" },
    { "name": "Evasion Rate %", "mat": "Mana", "pot": 20, "cost": 100, "cat": "Special Enhancement", "type": "u" },
    { "name": "Aggro %", "mat": "Mana", "pot": 6, "cost": "33.49", "cat": "Special Enhancement", "type": "u" },
    { "name": "Fire Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Water Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Wind Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Earth Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Light Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Dark Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Fire Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Water Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Wind Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Earth Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Light Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e" },
    { "name": "Dark Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e" },
];

class SIMULATOR {
    constructor() {
        this.stats = [];
        this.recipe_pot = 0;
        this.weap_arm = 'w'; // default to weapon...
        this.results = {};
    }

    getDropdown(slot_num) {
        let buffer = `<select id="slot${slot_num}" onchange="update_stats(${slot_num})"><option value=0>CHOOSE STAT</option>`;
        let last_cat = '';
        let cat_id = 0;

        for (let data of OPTIONS) {
            if (this.weap_arm === 'a' && data.cat === 'Awaken Elements') continue;
            if (last_cat !== data.cat) {
                // add heading
                buffer += `<option value="-1" disabled="disabled" style="color: blue">&gt;--${data.cat}--&lt;</option>`;
                last_cat = data.cat;
            }

            cat_id++;
            buffer += `<option value="${cat_id}">${data.name}</option>`;
        }

        buffer += '</select>';
        return buffer;
    }

    getStatData(value_name) {
        let data;
        if (typeof value_name === 'number') {
            data = OPTIONS[value_name - 1];
        } else {
            // debugging use
            data = OPTIONS.find(piece => piece.name === value_name);
        }

        data.maxSteps = Math.floor(70 / data.pot);
        if (data.name === 'Aggro %') data.maxSteps = 10;  // for some reason this only goes up to +10/-10 go figure.
        if (data.maxSteps >= MAX_STEPS) data.maxSteps = MAX_STEPS;
        else if (!data.maxSteps) data.maxSteps = 1;
        return data;
    }

    setStat(slot_num, value_name, new_value) {
        if (value_name === 'CHOOSE STAT' || value_name === 0) this.stats[slot_num] = null;
        let data = this.getStatData(value_name);

        let isNeg = new_value < 0;

        if (Math.abs(new_value) > data.maxSteps) {
            new_value = (isNeg ? -1 : 1) * data.maxSteps;
            // insert html edit
        }

        this.stats[slot_num] = {name: data.name, value: new_value, data};
    }

    run() {
        let stats = this.stats.filter(stats => stats && stats.value);

        let pot = 1;
        this.results = {}; // clean results!
        while (true) {
            let formula = new FORMULA(this, pot, this.recipe_pot, this.weap_arm, stats);
            formula.run();

            if (formula.success) {
                if (formula.success === 100) pot = pot + '+';
                this.results[pot] = formula;
            }

            if (formula.success === 100) break;
            pot++;
        }
    }
}

class FORMULA {
    constructor(simulator, potential, recipe_pot, weap_arm, stats) {
        this.simulator = simulator;
        this.steps = [];
        this.potential = potential;
        this.original_potential = potential + 0;
        this.recipe_pot = recipe_pot;
        this.weap_arm = weap_arm;
        this.mats = {Metal: 0, Cloth: 0, Beast: 0, Wood: 0, Medicine: 0, Mana: 0};

        this.stats = new Array(stats.length).fill(null);

        this.final_stats = stats.map((s, i) => {s.id = i; return s});
    }

    determinePenalty(stats = this.stats) {
        let cat = {};
        for (let s of stats) {
            if (!s) continue;
            let tcat = s.data.cat;
            if (!cat[tcat]) cat[tcat] = 0;
            cat[tcat]++;
        }
        let pen = 0;
        for (let c in cat) {
            if (cat[c] < 2) continue;
            pen += 0.05 * Math.pow(cat[c], 2);
        }
        return 1 + pen;
    }

    changeStat(slot, stat, value, isChange) {
        let data = this.stats[slot] || {value: 0, data: stat}; // safety catch should never activate
        if (data.name && data.name !== stat.name) {
            return null; // uh oh - someone is trying to assign to the wrong slot...
        }

        data.name = stat.name;

        if (isChange) value += data.value;
        if (data.value === value || Math.abs(data.value) >= stat.maxSteps) {
            return null; // no change, or cannot go any higher
        }

        let increment = value > data.value ? 1 : -1;

        // manage potential
        let potential = ((data.value > value ? data.value : value) - (data.value > value ? value : data.value)) * stat.pot;
        if (stat.type !== this.weap_arm && ['a', 'w'].includes(stat.type)) potential *= 2;
        if (increment < 0) potential *= 0.3;
        else potential *= -1;
        // ... and determine penalty
        potential *= this.determinePenalty();

        // manage mat usage count.
        let cost = 0;
        for (let i = data.value + increment; i !== value + increment; i += increment) {
            cost += this.getMatCost(i, stat);
        }

        data.value = value;
        this.stats[slot] = data;

        return { cost, potential, mat: stat.mat, step: this.toStepString(stat.name, value) };
    }

    toStepString(stat, value) {
      let increment_indicator = value > 0 ? '+' : '-';
      value = Math.abs(value);
      if (stat.indexOf('%') === 0) return increment_indicator + value + stat;
      else if (stat.slice(-1) === '%') return stat.slice(0, -1) + increment_indicator + ' ' + value + '%';
      return stat + ' ' + increment_indicator + ' ' + value
    }

    potFloor(number) {
        return number > 0 ? Math.floor(number) : Math.ceil(number);
    }

    applyStat(...stats) {
        let potUsed = 0;
        let matUsed = {Metal: 0, Cloth: 0, Beast: 0, Wood: 0, Medicine: 0, Mana: 0}
        let stepData = [];
        for (let s of stats) {
            // initiate stats
            if (!this.stats[s[0]]) {
                this.stats[s[0]] = {value: 0, data: s[1]};

            }
        }
        for (let stat of stats) {
            let usage = this.changeStat(...stat);
            if (!usage) continue;

            potUsed += usage.potential;
            matUsed[usage.mat] += usage.cost;
            stepData.push(usage.step);
        }

        if (!potUsed) return 0;

        // apply mat and potential costs
        for (let m in matUsed) this.mats[m] += matUsed[m];
        potUsed = this.potFloor(potUsed);
        this.potential += potUsed;

        stepData = stepData.join(', ');
        this.steps.push([stepData, this.potential]);

        return potUsed;
    }

    getMatCost(step, data) {
        return data.cost * Math.pow(step, 2);
    }

    statToArray(data) {
        return [data.id, data.data, data.value];
    }

    run() {
            /**
             * STEPS:
             *
             * 1. If there are any "repeated" stats that result in penalty, stat as much of the
             * positives as possible - first the positives that result in penalties; if there are none,
             * stick them all on one stat. Stat the biggest potential user first (Int+5%) then put the
             * smaller pot ones in one step at a time until you approach 0 pot left.
             *
             * 2. Stat all the negs in one go - stat the bigger pot giving neg (MAtk-7% as opposed to M. Pierce-3%)
             * first if the other one has to be left out later to leave one slot open (eg. statting fc15)
             *
             * 3. If there is any way of avoiding penalty points (steps that cost only 1 potential,
             * such as crit rate, and cast speed) put them in one point at a time.
             *
             * 4. Fill in the rest of the stats all in one go.
             */

            // determine any repeats first
            let categories = [];
            let repeated_categories = [];

            for (let s of this.final_stats) {
                let cat = s.data.cat;

                if (categories.includes(cat)) repeated_categories.push(cat);
                else categories.push(cat);
            }

            let repeated_stats = this.final_stats.filter(s => s && repeated_categories.includes(s.data.cat));

            // determine if there are any repeated stats that are positive;
            let positive_repeats = repeated_stats.filter(s => s.value > 0);
            if (positive_repeats.length) {
                // sort decending order of potential requirement
                positive_repeats = positive_repeats.sort((a, b) => b.data.pot * (b.data.cat === this.weap_arm ? 2 : 1) - a.data.pot * (a.data.cat === this.weap_arm ? 2 : 1));
                let remain_pot = 0;
                let mock_stats = [];
                // determine how much potential to leave behind - use a special type of reduce that applies penalty
                for (let i = 0; i < positive_repeats.length; i++) {
                    let r = positive_repeats[i];
                    if (i === positive_repeats.length - 1) {
                        mock_stats.push(r);
                        continue; // there is no need to leave behind any penalty for the biggets and smallest pot stat. -> those can be added along with the negs.
                    }
                    mock_stats.push(r);
                    let pen = this.determinePenalty(mock_stats);
                    remain_pot += Math.round(pen * r.data.pot); // leave enough pot for one point of that stat.
                }

                // apply all the positive ones
                let curr_pr_stat_id = 0;
                while (true) {
                    // determine number steps to take
                    let s = positive_repeats[curr_pr_stat_id];

                    let pen = this.determinePenalty([...this.stats, s]);
                    let turn_remain_pot = remain_pot + 0;
                    remain_pot -= pen * s.data.pot;
                    if (remain_pot < 0) remain_pot = 0;

                    let leave_behind = (!positive_repeats[curr_pr_stat_id + 2] && positive_repeats[curr_pr_stat_id + 1] && positive_repeats[curr_pr_stat_id + 1].data.pot === 1 ? 1 : 0);

                    let available = (this.potential - remain_pot - leave_behind - 1) || 1; // always leave one remaining!
                    let steps = Math.floor(available / s.data.pot);
                    if (steps > s.data.maxSteps) steps = s.data.maxSteps;

                    if (!curr_pr_stat_id) {
                        // stat em all if they're the first one
                         this.applyStat([s.id, s.data, steps, true]);
                    } else {
                        let used;
                        // do it step by step
                        for (let i = 0; i < steps; i++) {
                            used = this.applyStat([s.id, s.data, 1, true]);
                        }
                    }

                    let calc_pot = remain_pot <= 0 ? turn_remain_pot : remain_pot;
                    if (this.potential <= calc_pot || curr_pr_stat_id + 1 === positive_repeats.length) break; // this means that it's done

                    curr_pr_stat_id++;
                }

                let slotsLeft = this.stats.filter(s => !s).length; // empty slots
                let negs = this.final_stats.filter(s => s.value < 0);

                if (curr_pr_stat_id < positive_repeats.length - 1) {
                    // there are still positives left - add the negs now along with the last positive
                    curr_pr_stat_id++;
                    let s = positive_repeats[curr_pr_stat_id];

                    if (slotsLeft - 1 === negs.length) {
                        // leave one behind!
                        negs = negs.sort((a,b) => {
                           let apen = this.determinePenalty([...this.stats, a]);
                           let bpen = this.determinePenalty([...this.stats, b]);

                           return bpen - apen || b.data.pot * (b.data.cat === this.weap_arm ? 2 : 1) * -b.value - a.data.pot * (a.data.cat === this.weap_arm ? 2 : 1) * -a.value;
                        });

                        let shouldStat = negs.slice(0, negs.length - 1);
                        this.applyStat([s.id, s.data, 1, true], ...shouldStat.map(this.statToArray));
                    } else {
                        this.applyStat([s.id, s.data, 1, true], ...negs.map(this.statToArray));
                    }
                } else {
                    if (slotsLeft === negs.length) {
                        // leave one behind!
                        negs = negs.sort((a,b) => {
                           let apen = this.determinePenalty([...this.stats, a]);
                           let bpen = this.determinePenalty([...this.stats, b]);

                           return bpen - apen || b.data.pot * (b.data.cat === this.weap_arm ? 2 : 1) * -b.value - a.data.pot * (a.data.cat === this.weap_arm ? 2 : 1) * -a.value;
                        });

                        let shouldStat = negs.slice(0, negs.length - 1);
                        this.applyStat(...shouldStat.map(this.statToArray));
                    } else {
                        this.applyStat(...negs.map(this.statToArray));
                    }
                }
            } else {
                let negs = this.final_stats.filter(s => s.value < 0);
                this.applyStat(...negs.map(this.statToArray));
            }

            // now identify whichever ones are one pot - these are put in one at a time to avoid any penalties
            let onepot = this.final_stats.filter(s => s.data.pot === 1);
            for (let s of onepot) {
                while ((this.stats[s.id] ? this.stats[s.id].value : 0) < s.value) {
                    this.applyStat([s.id, s.data, 1, true]);
                }
            }

            // finally fill everything
            this.applyStat(...this.final_stats.map(this.statToArray));

            this.determineSuccess();
        }

    determineSuccess() {
        let prev_pot = this.steps[this.steps.length - 2] ? this.steps[this.steps.length - 2][1] : this.original_potential;
        let use_pot = this.recipe_pot > prev_pot ? this.recipe_pot : prev_pot;

        this.success = 130 + (230 * this.potential) / use_pot;

        if (this.success > 100) this.success = 100;
        else if (this.success < 0) this.success = 0;
    }
}

let Simulator = new SIMULATOR();

function update_stats(slot_num) {
  let dropdown_value = parseInt(document.getElementById('slot' + slot_num).value);
  if (dropdown_value > 0) {
    document.getElementById('slot' + slot_num + '_value').disabled = false;
  }
  else {
    document.getElementById('slot' + slot_num + '_value').disabled = true;
    document.getElementById('slot' + slot_num + '_value').value = '';
  }
  if (Simulator.getStatData(dropdown_value).cat === "Awaken Elements") {
    document.getElementById('slot' + slot_num + '_value').disabled = true;
    document.getElementById('slot' + slot_num + '_value').value = '1';
  }
  let input_value = parseInt(document.getElementById('slot' + slot_num + '_value').value);
  if (input_value) {
    Simulator.setStat(slot_num, dropdown_value, input_value);
    let max_value = Simulator.stats[slot_num].data.maxSteps;
    if (max_value < Math.abs(input_value)) {
      max_value = max_value * (input_value < 0 ? -1 : 1);
      Simulator.setStat(slot_num, dropdown_value, max_value);
      document.getElementById('slot' + slot_num + '_value').value = max_value;
    }
  }
}

function update_config(aspect) {
  let value = document.getElementById(aspect).value;
  Simulator[aspect] = value;
  if (aspect === 'weap_arm') build_stat_dropdown();
}

function build_stat_dropdown() {
  let buffer = '';
  for (let i = 0; i < 6; i++) {
    buffer += Simulator.getDropdown(i) + ` <input style="width: 50px;" disabled=disabled type="number" value='' id='slot${i}_value' oninput="update_stats(${i})"></input><br />`;
  }
  document.getElementById('stat_menu').innerHTML = buffer;
}

function build_menu(initialize) {
  build_stat_dropdown();
  // build common stat formulas part - to be done later
}

function get_results() {
  Simulator.run();
  let result_keys = Object.keys(Simulator.results).reverse();
  let buffer = []
  for (let pot of result_keys) {
    let formula = Simulator.results[pot];
    buffer.push(`<tr class='results' onclick="show_details('${pot}')" id="pot_${pot}"><td style="text-align: left">${pot}</td><td style="text-align: right">${formula.success.toFixed(2)}%</td></tr>`);
  }

  document.getElementById('results').innerHTML = '<table style="width:100%"><tr><th style="text-align: left">Potential</th><th style="text-align: right">Success Rate</th></tr>' + buffer.join('') + '</table>';
}

function show_details(pot) {
  if (!Simulator.results[pot]) return;
  let formula = Simulator.results[pot];
  let buffer = `<table><tr><td style="width: 15%; color: green; font-weight: bold; text-align: left">POT ${pot}</td><td style="width: 70%"></td><td style="width:15%; color: green; font-weight: bold; text-align: right">${formula.success.toFixed(2)}%</td></tr>`;
  buffer += `<tr><th>Step</th><th>Change</th><th>Pot</th></tr>`;

  let s = 0;
  for (let step of formula.steps) {
    buffer += `<tr><td>${++s}</td><td>${step[0]}</td><td style="text-align: right">${step[1]}</td></tr>`
  }

  buffer += '</table>'

  document.getElementById('details').innerHTML = buffer;
}
