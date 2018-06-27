"use strict";

const MAX_STEPS = 16; // max is fill +16
const SLOTS = 6; // max number of slots is 6

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

    run(custom_pot) {
        let stats = this.stats.filter(stats => stats && stats.value);

        let pot = custom_pot || 1;
        this.results = {}; // clean results!
        while (pot < 1000) {
            let formula = new FORMULA(this, pot, this.recipe_pot, this.weap_arm, stats);
            formula.run();

            if (formula.success || custom_pot) {
                if (formula.success === 100 && !custom_pot) pot = pot + '+';
                this.results[pot] = formula;
            }
            if (formula.success === 100 || custom_pot) break;
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

        return { cost, potential, mat: stat.mat, step: FORMULA.toStepString(stat.name, value) };
    }

    static toStepString(stat, value) {
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
        for (let m in matUsed) this.mats[m] += Math.floor(matUsed[m]);
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

    absolutePot(stat) {
      let abs_pot = Math.abs(stat.data.pot * stat.value * (stat.data.type !== this.weap_arm && ['a', 'w'].includes(stat.data.type) ? 2 : 1));
      return abs_pot;
    }

    getSum(original, max_params, sum, a, ...dividends) {
        let a_count = 1;
        while (a_count * a < sum) {
            let a_total = a_count * a;
            let remainder = sum - a_total;
            if (dividends.length === 1) {
                // treat that as b
                let b = dividends[0];
                let b_count = Math.floor(remainder / b);
                if (b_count * b !== remainder) {
                    a_count++;
                    continue;
                }
                let solution = [a_count, b_count];
                if (original) {
                    // make sure the multiples are within the max values requested
                    let difference = max_params.map((m, i) => m - solution[i]);
                    if (difference.some(n => n < 0)) {
                        a_count++;
                        continue;
                    }
                }
                return solution;
            } else {
                let results = this.getSum(false, remainder, ...dividends);
                if (!results) {
                    a_count++;
                    continue;
                }
                let solution = [a_count, ...results];
                if (original) {
                    // make sure the multiples are within the max values requested
                    let difference = max_params.map((m, i) => m - solution[i]);
                    if (difference.some(n => n < 0)) {
                        a_count++;
                        continue;
                    }
                }
                return solution;
            }
            a_count++;
        }

        return null;
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
        let positive_repeats = repeated_stats.filter(s => s.value > 0).sort((a, b) => this.absolutePot(b) - this.absolutePot(a));
        let negs = this.final_stats.filter(s => s.value < 0).sort((a, b) => this.absolutePot(b) - this.absolutePot(a));

        let non_repeat_positive = this.final_stats.filter(s => s.value > 0 && !positive_repeats.some(st => s.name === st.name)).sort((a, b) => this.absolutePot(b) - this.absolutePot(a));
        let stat_positives = [];

        if (negs.length && repeated_stats.length) {
          // there will be penalties later on, so use up the potential first
          let pos_potential = 0;
          let mock_stats = [];
          for (let s of positive_repeats) {
            mock_stats.push(s);
            let pen = this.determinePenalty(mock_stats);
            if (s.data.pot === 1) pos_potential += 1;
            else pos_potential += this.absolutePot(s) * pen;
          }
          if (pos_potential < this.potential && non_repeat_positive.length) {
            // since it wont use up all the potential before statting negatives, we will bring
            // in some non-repeated positives so they can escape penalty after the negatives.
            while (pos_potential < this.potential && non_repeat_positive.length && positive_repeats.length + negs.length !== SLOTS - 1) {
              let new_add = non_repeat_positive.shift(); // take the first one in queue.
              if (new_add.data.pot === 1) continue; // this doesn't matter - it'll still be one pot per step after.
              pos_potential += this.absolutePot(new_add);
              stat_positives.push(new_add);
            }
            // the non-repeated ones are always put in before the repeats so they do not incur penalty.
            stat_positives = [...stat_positives, ...positive_repeats];
          } else {
            stat_positives = positive_repeats;
          }

          // start the statting
          mock_stats = [];
          let remain_pot = 0;
          for (let s of stat_positives) {
            mock_stats.push(s);
            let pen = this.determinePenalty(mock_stats);
            let borrowed_stat = s.data.type !== this.weap_arm && ['a', 'w'].includes(s.data.type);
            if (s.data.pot === 1) remain_pot += 1;
            else remain_pot += s.data.pot * pen * (borrowed_stat ? 2 : 1);
          }

          let non_onesies_positives = stat_positives.filter(s => s.data.pot > 1);
          let onesies_positives = stat_positives.filter(s => s.data.pot === 1);
          let onesies_success = false;
          if (non_onesies_positives.length > 1 && onesies_positives.length) {
            let sum = this.potential - (1 + onesies_positives.length);
            // now make the potentials of the other 2 work out to as close to the sum as possible.
            // the most feasible algorithm is to start the first one at 1, and keep going up, keeping
            // record of whichever one comes closest to the sum, or meets the sum.
            // If there are multiple solutions, we will use the one that uses the most from the BIGGEST
            // denominator.
            mock_stats = [];
            let non_onesies_pot = [];
            for (let s of non_onesies_positives) {
              mock_stats.push(s);
              let pen = this.determinePenalty(mock_stats);
              let borrowed_stat = s.data.type !== this.weap_arm && ['a', 'w'].includes(s.data.type);

              non_onesies_pot.push(Math.floor(s.data.pot * pen * (borrowed_stat ? 2 : 1)));
            }
            let results = this.getSum(true, non_onesies_positives.map(s => s.value).reverse(), sum, ...non_onesies_pot.reverse());
            if (results) {
              results = results.reverse();
              onesies_success = true;
              for (let i = 0; i < non_onesies_positives.length; i++) {
                let s = non_onesies_positives[i];
                let steps = results[i];
                let pen = this.determinePenalty([s, ...this.stats]);
                if (pen === 1) {
                  this.applyStat([s.id, s.data, steps]);
                } else {
                  // the ones after will be done 1 step at a time for a total number of steps.
                  for (let i = 0; i < steps; i++) this.applyStat([s.id, s.data, 1, true]);
                }
              }
              // add one step to each of the onesies
              for (let s of onesies_positives) {
                this.applyStat([s.id, s.data, 1, true]);
              }

              stat_positives = [];
            }
          }
          let stat_negs_seperate = stat_positives.length + negs.length === SLOTS;
          if (!onesies_success) {
            let first_loop = true;
            while (stat_positives.length) {
              let s = stat_positives.shift();
              let pen = this.determinePenalty([s, ...this.stats]);
              if (Math.floor(s.data.pot * pen) >= this.potential) {
                stat_positives.unshift(s);
                break; // leave it in the positives to be statted and move on to the negs
              }

              let borrowed_stat = s.data.type !== this.weap_arm && ['a', 'w'].includes(s.data.type);
              remain_pot -= s.data.pot * pen * (borrowed_stat ? 2 : 1); // remove from remain_pot
              if (remain_pot < 0) remain_pot = 0;
              let pot_per_step = Math.floor(pen * s.data.pot * (borrowed_stat ? 2 : 1));

              // if there's one stat left after and it uses a penalty, dont leave any potential for it
              if (stat_positives.length === 1 && !stat_negs_seperate) {
                let s1 = stat_positives[0];
                if (Math.floor(this.determinePenalty([s, s1, ...this.stats]) * s1.data.pot) !== s1.data.pot) {
                  // if it incurs a penalty anyways -
                  // stat as much of the current one as possible and treat the next one with the negs
                  remain_pot = 0;
                }
              }

              let available_pot = this.potential - remain_pot;
              let steps;

              if (s.data.pot === 1 || (stat_negs_seperate && !stat_positives.length)) {
                // these just need one point - there are no penalties for these even if done after the negs.
                steps = 1;
              } else {
                // max number of steps possible with available potential.
                steps = Math.floor(available_pot / pot_per_step);
              }
              if (steps * pot_per_step >= this.potential + remain_pot) steps--; // always leave 1 point left
              if (steps > s.value) steps = s.value;
              if (pen === 1) {
                // the first one always is done in one chunk, as it will never be affected by potential.
                this.applyStat([s.id, s.data, steps]);
              } else {
                // the ones after will be done 1 step at a time for a total number of steps.
                for (let i = 0; i < steps; i++) this.applyStat([s.id, s.data, 1, true]);
              }

              first_loop = false;
            }
          }
        }
        // if there is potential leftover check that nothing else can fill it without taking in one less negative.


        // check if one neg has to be left out
        if ((stat_positives.length ? 5 : 6) - this.stats.filter(s => s).length === negs.length) {
          negs = negs.slice(0, -1);
        }
        // now deal with the negatives
        if (stat_positives.length && negs.length) {
          let s = stat_positives.shift();
          this.applyStat([s.id, s.data, 1, true], ...negs.map(this.statToArray));
        } else if (negs.length) {
          // apply negs
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
    Simulator.stats[slot_num] = null;
  }
  if (Simulator.getStatData(dropdown_value).cat === "Awaken Elements") {
    document.getElementById('slot' + slot_num + '_value').disabled = true;
    document.getElementById('slot' + slot_num + '_value').value = '1';
  }
  let input_value = parseInt(document.getElementById('slot' + slot_num + '_value').value);
  if (!isNaN(input_value)) {
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
  show_formulas();
}

function get_results(custom_pot) {
  Simulator.run(custom_pot);
  let result_keys = Object.keys(Simulator.results).reverse();
  let buffer = []
  for (let pot of result_keys) {
    let formula = Simulator.results[pot];
    buffer.push(`<tr class='results' onclick="show_details('${pot}')" id="pot_${pot}"><td style="text-align: left">${pot}</td><td style="text-align: right">${formula.success.toFixed(2)}%</td></tr>`);
  }

  document.getElementById('results').innerHTML = '<table style="width:100%"><tr><th style="text-align: left">Potential</th><th style="text-align: right">Success Rate</th></tr>' + buffer.join('') + '</table>';
  show_details(result_keys[0]);
}

function show_details(pot) {
  if (!Simulator.results[pot]) return;
  let formula = Simulator.results[pot];
  let buffer = `<table style="width:100%"><tr><td style="width: 15%; color: green; font-weight: bold; text-align: left">POT ${pot}</td><td style="width: 70%"></td><td style="width:15%; color: green; font-weight: bold; text-align: right">${formula.success.toFixed(2)}%</td></tr>`;
  buffer += `<tr><th style="text-align: left">Step</th><th style="text-align: left">Change</th><th  style="text-align: right">Pot</th></tr>`;

  let s = 0;
  for (let step of formula.steps) {
    buffer += `<tr><td>${++s}</td><td>${step[0]}</td><td style="text-align: right">${step[1]}</td></tr>`
  }

  buffer += `</table><div style="text-align: right"><button style="background: none; border: none; color: blue;" onclick="copy_formula_for_pot('${pot}')">[Copy Formula]</button></div><h3 style="text-align: center">Materials Used</h3><table style="width:100%"><tr><th style="width:75%">Materials</th><th>Pts.</th></tr>`

  for (let m in formula.mats) {
    buffer += `<tr><td style="text-align: left">${m}</td><td style="text-align: right">${formula.mats[m]}</td></tr>`;
  }

  buffer += '</table>';

  document.getElementById('details').innerHTML = buffer;
}

function escapeHTML (str) {
    return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/\//g, '&#x2f;');
}

function show_formulas() {
  let buffer = Formulas.sort((a,b) => b.weap_arm.localeCompare(a.weap_arm)).map(f => {
    let json = escapeHTML(JSON.stringify(f));
    return `<button class="formula_button" onclick='set_formula(${json})' style="width: 100%; text-align: left">${f.weap_arm === 'w' ? '<span style="color: red; font-weight: bold">Weapon</span>' : '<span style="color: Green; font-weight: bold">Armor</span>'}<br />${f.stats.filter(s => s[1] > 0 || s[2]).map(s => FORMULA.toStepString(...s)).join('<br />')}</button>`
  }).join('<br />');
  document.getElementById('stat_formulas').innerHTML = buffer;
}

function set_formula(data) {
  Simulator.weap_arm = data.weap_arm;
  let i = 0;
  for (let s of data.stats) Simulator.setStat(i++, ...s);
  sync_ui_with_sim();
  get_results();
}

function reverse_options_to_index(name) {
  for (let i = 0; i < OPTIONS.length; i++) {
    if (OPTIONS[i].name === name) return i + 1;
  }
  return 0;
}

function sync_ui_with_sim () {
  document.getElementById('weap_arm').value = Simulator.weap_arm;
  build_stat_dropdown();

  for (let i = 0; i < Simulator.stats.length; i++) {
    let s = Simulator.stats[i];
    if (!s) continue;

    document.getElementById('slot' + i).value = reverse_options_to_index(s.name);
    document.getElementById('slot' + i + '_value').value = s.value;
    document.getElementById('slot' + i + '_value').disabled = false;
  }
}

function prompt_potential() {
  let pot = prompt('Please enter the amount of potential to create a statting recipe for.');
  if (!pot) return;

  pot = parseInt(pot);
  if (!pot || pot < 1) return alert('Please enter a valid positive number.');
  get_results(pot);
}

function copy_formula_for_pot(pot) {
  if (!Simulator.results[pot]) return;

  let formula = Simulator.results[pot];
  let steps = formula.steps;

  let buffer = steps.map((s, i) => `Step ${i + 1}: ${s[0]} (${s[1]} potential left)`);
  buffer.push(`Success rate: ${formula.success.toFixed(2)}%`);
  let full = Object.keys(Simulator.results).find(f => Simulator.results[f].success === 100);
  if (full && formula.success !== 100) buffer.push('For non-gamble: ' + full + ' potential required.');

  let aux = document.createElement("textarea");
  aux.value = `Potential: ${pot.replace(/[^0-9]/g, '')}\r\n` + buffer.join('\r\n');
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}
