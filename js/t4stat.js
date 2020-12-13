
const MAX_STEPS = 20;
const BONUS_STEPS = 2;
const SLOTS = 8;

const PENALTY_DATA = [0, 0, 20, 45, 80, 125, 180, 245, 320];

const DEFAULT_WEAPON_RECIPE_POT = 46;
const DEFAULT_ARMOR_RECIPE_POT = 44;

const OPTIONS = [
    { "name": "STR", "mat": "Beast", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u", bonus: 1},
    { "name": "STR %", "mat": "Beast", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "INT", "mat": "Wood", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u", bonus: 1},
    { "name": "INT %", "mat": "Wood", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "VIT", "mat": "Metal", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u" , bonus: 1},
    { "name": "VIT %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "AGI", "mat": "Cloth", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u", bonus: 1 },
    { "name": "AGI %", "mat": "Cloth", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },
    { "name": "DEX", "mat": "Medicine", "pot": 5, "cost": 25, "cat": "Enhance Stats", "type": "u", bonus: 1},
    { "name": "DEX %", "mat": "Medicine", "pot": 10, "cost": 50, "cat": "Enhance Stats", "type": "u" },

    { "name": "Natural HP Regen", "mat": "Metal", "pot": 5, "cost": 25, "cat": "Enhance HP/MP", "type": "a", bonus: 1},
    { "name": "Natural HP Regen %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance HP/MP", "type": "a"},
    { "name": "Natural MP Regen", "mat": "Wood", "pot": 10, "cost": 50, "cat": "Enhance HP/MP", "type": "a" , bonus: 1, bonusratio: 0.5 },
    { "name": "Natural MP Regen %", "mat": "Wood", "pot": 20, "cost": 100, "cat": "Enhance HP/MP", "type": "a" },
    { "name": "MaxHP", "mat": "Metal", "pot": 3, "cost": "16.49", "cat": "Enhance HP/MP", "type": "u", bonus: 160, step: 10 },
    { "name": "MaxHP %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance HP/MP", "type": "u" },
    { "name": "MaxMP", "mat": "Wood", "pot": 6, "cost": "33.49", "cat": "Enhance HP/MP", "type": "u", max: 15, max_only: true, step: 10, bonus: 10, bonusratio: 0.5 },

    { "name": "ATK", "mat": "Beast", "pot": 3, "cost": "16.49", "cat": "Enhance Attack", "type": "w", bonus: 1 },
    { "name": "ATK %", "mat": "Beast", "pot": 10, "cost": 50, "cat": "Enhance Attack", "type": "w", bonus: 1, bonusratio: 0.5 },
    { "name": "MATK", "mat": "Wood", "pot": 3, "cost": "16.49", "cat": "Enhance Attack", "type": "w", bonus: 1 },
    { "name": "MATK %", "mat": "Wood", "pot": 10, "cost": 50, "cat": "Enhance Attack", "type": "w", bonus: 1, bonusratio: 0.5 },
    { "name": "Stability %", "mat": "Medicine", "pot": 20, "cost": 100, "cat": "Enhance Attack", "type": "u" },
    { "name": "Physical Pierce %", "mat": "Beast", "pot": 20, "cost": 100, "cat": "Enhance Attack", "type": "w" },
    { "name": "Magic Pierce %", "mat": "Wood", "pot": 20, "cost": 100, "cat": "Enhance Attack", "type": "w" },

    { "name": "DEF", "mat": "Metal", "pot": 3, "cost": "16.49", "cat": "Enhance Defense", "type": "a", bonus: 10 },
    { "name": "DEF %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance Defense", "type": "a" },
    { "name": "MDEF", "mat": "Metal", "pot": 3, "cost": "16.49", "cat": "Enhance Defense", "type": "a", bonus: 10 },
    { "name": "MDEF %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance Defense", "type": "a" },
    { "name": "Physical Resistance %", "mat": "Metal", "pot": 10, "cost": 50, "cat": "Enhance Defense", "type": "a" },
    { "name": "Magical Resistance %", "mat": "Wood", "pot": 10, "cost": 50, "cat": "Enhance Defense", "type": "a" },

    { "name": "Reduce Dmg (Foe Epicenter) %", "mat": "Metal", "pot": 6, "cost": 15, "cat": "Enhance Defense", "type": "a", nonega: true, max: BONUS_STEPS },
    { "name": "Reduce Dmg (Player Epicenter) %", "mat": "Metal", "pot": 6, "cost": 15, "cat": "Enhance Defense", "type": "a", nonega: true, max: BONUS_STEPS },
    { "name": "Reduce Dmg (Straight Line) %", "mat": "Wood", "pot": 6, "cost": 15, "cat": "Enhance Defense", "type": "a", nonega: true, max: BONUS_STEPS },
    { "name": "Reduce Dmg (Charge) %", "mat": "Wood", "pot": 6, "cost": 15, "cat": "Enhance Defense", "type": "a", nonega: true, max: BONUS_STEPS },
    { "name": "Reduce Dmg (Meteor) %", "mat": "Wood", "pot": 4, "cost": 15, "cat": "Enhance Defense", "type": "a", nonega: true, max: BONUS_STEPS },
    { "name": "Reduce Dmg (Bullet) %", "mat": "Wood", "pot": 4, "cost": 15, "cat": "Enhance Defense", "type": "a", nonega: true, max: BONUS_STEPS },
    { "name": "Reduce Dmg (Bowling) %", "mat": "Wood", "pot": 4, "cost": 15, "cat": "Enhance Defense", "type": "a", nonega: true, max: BONUS_STEPS },
    { "name": "Reduce Dmg (Floor) %", "mat": "Wood", "pot": 4, "cost": 15, "cat": "Enhance Defense", "type": "a", nonega: true, max: BONUS_STEPS },


    { "name": "Accuracy", "mat": "Medicine", "pot": 10, "cost": 50, "cat": "Enhance Accuracy", "type": "w", bonus: 2, bonusratio: 0.5 },
    { "name": "Accuracy %", "mat": "Medicine", "pot": 20, "cost": 100, "cat": "Enhance Accuracy", "type": "w" },

    { "name": "Dodge", "mat": "Cloth", "pot": 10, "cost": 50, "cat": "Enhance Dodge", "type": "a", bonus: 2, bonusratio: 0.5 },
    { "name": "Dodge %", "mat": "Cloth", "pot": 20, "cost": 100, "cat": "Enhance Dodge", "type": "a" },

    { "name": "ASPD", "mat": "Cloth", "pot": 1, "cost": "1.49", "cat": "Enhance Speed", "type": "u", bonus: 16 },
    { "name": "ASPD %", "mat": "Cloth", "pot": 1, "cost": 5, "cat": "Enhance Speed", "type": "u" },
    { "name": "CSPD", "mat": "Medicine", "pot": 1, "cost": "1.49", "cat": "Enhance Speed", "type": "u" },
    { "name": "CSPD %", "mat": "Medicine", "pot": 1, "cost": 5, "cat": "Enhance Speed", "type": "u", bonus: 16 },

    { "name": "Critical Rate", "mat": "Mana", "pot": 1, "cost": 5, "cat": "Enhance Critical", "type": "u", bonus: 1, max_only: true },
    { "name": "Critical Rate %", "mat": "Mana", "pot": 1, "cost": 5, "cat": "Enhance Critical", "type": "u", bonus: 1, max_only: true },
    { "name": "Critical Damage", "mat": "Mana", "pot": 3, "cost": "16.49", "cat": "Enhance Critical", "type": "u" },
    { "name": "Critical Damage %", "mat": "Mana", "pot": 10, "cost": 50, "cat": "Enhance Critical", "type": "u" },

    { "name": "% stronger against Fire", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Water", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Wind", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Earth", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Light", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "% stronger against Dark", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "w" },
    { "name": "Fire resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a", bonus: 1, bonusratio: 0.5 },
    { "name": "Water resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a", bonus: 1, bonusratio: 0.5 },
    { "name": "Wind resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a", bonus: 1, bonusratio: 0.5 },
    { "name": "Earth resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a", bonus: 1, bonusratio: 0.5 },
    { "name": "Light resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a", bonus: 1, bonusratio: 0.5 },
    { "name": "Dark resistance %", "mat": "Mana", "pot": 5, "cost": 25, "cat": "Enhance Elements", "type": "a", bonus: 1, bonusratio: 0.5 },

    { "name": "Ailment Resistance %", "mat": "Mana", "pot": 20, "cost": 100, "cat": "Special Enhancement", "type": "u" },
    { "name": "Guard Power %", "mat": "Mana", "pot": 20, "cost": 100, "cat": "Special Enhancement", "type": "u" },
    { "name": "Guard Rate %", "mat": "Mana", "pot": 20, "cost": 100, "cat": "Special Enhancement", "type": "u" },
    { "name": "Evasion Rate %", "mat": "Mana", "pot": 20, "cost": 100, "cat": "Special Enhancement", "type": "u" },
    { "name": "Aggro %", "mat": "Mana", "pot": 6, "cost": "33.49", "cat": "Special Enhancement", "type": "u", max: 15, max_only: true, bonus: 1, bonusratio: 0.5},

    { "name": "Fire Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Water Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Wind Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Earth Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Light Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Dark Element", "mat": "Mana", "pot": 100, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Fire Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Water Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Wind Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Earth Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Light Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
    { "name": "Dark Element (matching)", "mat": "Mana", "pot": 10, "cost": 150, "cat": "Awaken Elements", "type": "e", max: 1, nonega: true },
];

function toram_round(value) {
    if (value > 1) return Math.floor(value);
    return Math.ceil(value);
}

function deep_clone (obj) {
    let type = typeof obj;
    if (Array.isArray(obj)) type = 'array';

    let newObj;
    switch (type) {
        case 'string':
            newObj = '' + obj;
            break;
        case 'array':
            newObj = obj.slice(0).map(i => deep_clone(i));
            break;
        case 'number':
            newObj = 0 + obj;
            break;
        case 'boolean':
            newObj = !!obj;
            break;
        case 'function':
            newObj = Object.assign({}, {func: obj}).func;
            break;
        case 'object':
            // null is a special case
            if (obj === null) return null;

            newObj = {};
            for (let prop in obj) {
                newObj[prop] = deep_clone(obj[prop]);
            }
    }

    return newObj;
}

class Slot {
    constructor(slot_num, stat) {
        this.currentStat = 0;
        this.futureStat = 0;
        
        this.currentSteps = 0;
        this.futureSteps = 0;

        this.slot_num = slot_num;
        
        this.stat_name = null;
        this.stat_data = null;
        this.stat_data_id = 0;
        
        this.stat = stat;
        
        this.new_stat = true;

        this.disabled = false;
    }

    buildDisplay() {
        let buffer = `<select id="slot${this.slot_num}" onchange="App.getCurrent().slots[${this.slot_num}].onUpdate()"><option value=0>CHOOSE STAT</option>`;
        let last_cat = '';
        let cat_id = 0;

        for (let data of OPTIONS) {
            if (this.stat.type === 'a' && data.cat === 'Awaken Elements') continue;
            if (last_cat !== data.cat) {
                // add heading
                buffer += `<option value="-1" disabled="disabled" style="color: blue">&gt;--${data.cat}--&lt;</option>`;
                last_cat = data.cat;
            }

            cat_id++;
            buffer += `<option value="${cat_id}">${data.name}</option>`;
        }

        buffer += '</select>';

        buffer += `&nbsp;&nbsp;<input autocomplete="off" type="text" maxlength=4 size=4 disabled id="input${this.slot_num}" value=0 onkeydown="App.getCurrent().slots[${this.slot_num}].onKeyPress(event)" oninput="App.getCurrent().slots[${this.slot_num}].onUpdate()" style="color: blue"></input> <span id="matcost${this.slot_num}" style="color: green; font-size: 8pt"></span>`
        return buffer;
    }

    onKeyPress(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        // console.log(charCode);

        const exceptions = [8, 9, 37, 39, 189]
        // number management
        if (charCode === 38 || charCode === 81) {
            // up
            this.changeValueBySteps(1, true);
            evt.returnValue = false;
            if (evt.preventDefault) evt.preventDefault();
        } else if (charCode === 40 || charCode === 87) {
            // down
            this.changeValueBySteps(-1, true);
            evt.returnValue = false;
            if (evt.preventDefault) evt.preventDefault();
        // shorthands
        } else if (charCode === 13) {
            // enter
            this.stat.confirm();
        } else if (charCode === 65) {
            // a = all
            this.changeValueBySteps(this.getMaxSteps());
            evt.returnValue = false;
            if (evt.preventDefault) evt.preventDefault();
        } else if (charCode === 68) {
            // d = min
            this.changeValueBySteps(-1 * this.getMaxSteps(true));
            evt.returnValue = false;
            if (evt.preventDefault) evt.preventDefault();
        } else if (charCode === 70) {
            // f = fill
            this.runFill();
            evt.returnValue = false;
            if (evt.preventDefault) evt.preventDefault();
        } else if (charCode === 83) {
            // s = step
            this.runStep();
            evt.returnValue = false;
            if (evt.preventDefault) evt.preventDefault();
        } else if (charCode === 82) {
            // s = step
            this.stat.undo();
            evt.returnValue = false;
            if (evt.preventDefault) evt.preventDefault();

        // general
        } else if ((charCode > 57 || charCode < 48) && !exceptions.includes(charCode)) {
            evt.returnValue = false;
            if (evt.preventDefault) evt.preventDefault();
        } else if (!exceptions.includes(charCode)) {
            // normal entry
            if (document.getElementById(`input${this.slot_num}`).value === '0') document.getElementById(`input${this.slot_num}`).value = '';
        }
    }

    onUpdate() {
        const slot_id = `slot${this.slot_num}`;
        const input_id = `input${this.slot_num}`;
        const cost_id = `matcost${this.slot_num}`;

        let data_id = parseInt(document.getElementById(slot_id).value);

        if (data_id === 0) {
            // reset
            this.stat_name = null;
            this.stat_data = null;
            this.currentStat = 0;
            this.futureStat = 0;
            this.currentSteps = 0;
            this.futureSteps = 0;
            this.stat_data_id = 0;

            document.getElementById(input_id).disabled = true;
            this.syncDisplayWithValues();
            this.stat.onUpdate();
            return;
        }

        // set up stat data in this slot
        let stat_data = deep_clone(OPTIONS[data_id - 1]);
        this.stat_data = stat_data;
        this.stat_name = stat_data.name;
        this.stat_data_id = data_id;

        if (this.new_stat) this.new_stat = data_id;

        // enable input field
        document.getElementById(input_id).disabled = false;

        let future_stat = document.getElementById(input_id).value;

        if (/[^0-9\-]/g.test(future_stat)) return this.syncDisplayWithValues();

        this.futureStat = future_stat;

        this.futureSteps = this.statToSteps();

        this.applyColouration();

        if (this.currentSteps !== this.futureSteps) document.getElementById(cost_id).innerHTML = this.getCostDisplay();
        else document.getElementById(cost_id).innerHTML = '';

        this.stat.onUpdate();
    }

    applyColouration() {
        const input_id = `input${this.slot_num}`;
        if (!this.stat_name) return document.getElementById(input_id).style.color = 'blue';

        const allowed_max = this.getMaxStat(this.futureStat < 0);

        if (!document.getElementById(input_id).style) document.getElementById(input_id).style = {};

        if (Math.abs(this.futureStat) > allowed_max || (this.futureSteps < 0 && this.stat_data.nonega)) {
            document.getElementById(input_id).style.color = 'red';
        } else if (this.futureSteps >= 0) {
            document.getElementById(input_id).style.color = 'black';
        } else {
            document.getElementById(input_id).style.color = 'gray';
        }
    }

    // override
    rawOverride(data) {
        // [slot_num, increase/decrease in value, new stat ID]
        const [slot_num, delta_steps, id] = data;

        if (id !== null) {
            if (id === 0) {
                this.stat_name = null;
                this.stat_data = null;
                this.currentStat = 0;
                this.futureStat = 0;
                this.currentSteps = 0;
                this.futureSteps = 0;
                this.stat_data_id = 0;
                this.new_stat = true;

                this.syncDisplayWithValues();
                return;
            } else {
                this.stat_data_id = id;
                this.stat_data = deep_clone(OPTIONS[id - 1]);
                this.stat_name = this.stat_data.name;
                this.new_stat = false;
            }
        }

        this.futureSteps += delta_steps;
        this.currentSteps = this.futureSteps + 0;

        this.futureStat = this.stepsToStat(this.futureSteps);
        this.currentStat = this.futureStat + 0;
        this.syncDisplayWithValues();
    }

    syncDisplayWithValues() {
        const slot_id = `slot${this.slot_num}`;
        const input_id = `input${this.slot_num}`;

        document.getElementById(slot_id).value = this.stat_data_id;
        document.getElementById(input_id).value = this.futureStat; 

        document.getElementById(slot_id).disabled = !!this.stat_name || this.stat.finished;
        document.getElementById(input_id).disabled = !this.stat_name || this.stat.finished;
        this.applyColouration();
    }

    // value changes
    changeValueBySteps(value, relative) {
        let current_steps = this.futureSteps + 0;
        let future_steps = current_steps + 0;
        if (relative) future_steps += value;
        else future_steps = value;

        let future_stat = this.stepsToStat(future_steps);
        document.getElementById(`input${this.slot_num}`).value = future_stat;
        
        this.onUpdate();
    }

    // data processing
    stepsToStat(value = this.futureSteps) {
        let is_negative = value < 0;
        value = Math.abs(value);
        if (value < MAX_STEPS) {
            value = value * (this.stat_data.step || 1);
        } else {
            const bonus = this.stat_data.bonus || this.stat_data.step || 1;
            value = MAX_STEPS * (this.stat_data.step || 1) + (value - MAX_STEPS) * bonus;
        }

        if (is_negative) value *= -1;
        return value;
    }

    statToSteps(value = this.futureStat) {
        const input_is_negative = value < 0 ? -1 : 1;
        const change_per_step = this.stat_data.step || 1;
        const max_normal_value = this.max ? this.max * change_per_step : MAX_STEPS * change_per_step;
        let future_steps;

        if (Math.abs(value) > max_normal_value) {
            const overstep = this.stat_data.bonus || change_per_step;
            future_steps = (MAX_STEPS + ((Math.abs(value) - max_normal_value) / overstep)) * input_is_negative;
        } else {
            future_steps= value / change_per_step;
        }
        return toram_round(future_steps);    
    }

    getMaxStat(isNega) {
        const step_max = 100 / this.stat_data.pot;
        const bonus_steps = Math.floor(BONUS_STEPS * (this.stat_data.bonusratio || 1));
        const custom_max = (this.stat_data.max || 0) * (this.stat_data.step || 1);
        const base_max = step_max > MAX_STEPS ? MAX_STEPS : step_max
        const max_base_stat = (this.stat_data.step || 1) * base_max
        const bonus_max = (this.stat_data.bonus || 0) * bonus_steps;

        if (this.stat_data.bonus) {
            let value = (custom_max || max_base_stat) + bonus_max;
            if (isNega && this.stat_data.max_only) return custom_max || max_base_stat;
            return value;
        } else if (custom_max) {
            return custom_max;
        } else {
            return base_max * (this.stat_data.step || 1);
        }
    }

    getMaxSteps(isNega) {
        const stat = this.getMaxStat(isNega);
        return this.statToSteps(stat);
    }

    getCost() {
        const base_cost = this.stat_data.cost;
        const change = this.currentSteps < this.futureStat ? 1 : -1;

        let cost = 0;
        for (let i = this.currentSteps + change; (change > 0 ? i <= this.futureSteps : i >= this.futureSteps); i += change) {
            cost += base_cost * Math.pow(i, 2);
        }
        return toram_round(cost);
    }

    getMatType() {
        return this.stat_data.mat;
    }

    getCostDisplay() {
        return `(${this.getCost()} ${this.getMatType()})`;
    }

    getPotentialChange() {
        if (this.currentSteps === this.futureSteps) return 0;
        const change = this.currentSteps > this.futureSteps ? -1 : 1;
        let bonus = 0;
        const abs_steps = Math.abs(this.futureSteps);
        const abs_current = Math.abs(this.currentSteps);

        let future_steps = this.futureSteps + 0;

        const step_max = 100 / this.stat_data.pot;
        const max_normal_steps = this.stat_data.max || (step_max > MAX_STEPS ? MAX_STEPS : step_max);
        // potential is doubled for steps exceeding +/-20 if you are increasing/deceasing the stat in that direction
        // potential consumed is still normal if increasing from -21 to -20
        if (abs_steps > (max_normal_steps)) {
            const bonus_start = max_normal_steps > abs_current ? max_normal_steps: abs_current;
            bonus = (abs_steps - bonus_start) * this.stat_data.pot * 2;
            future_steps = bonus_start * change;
        }

        const normal_step_diff = Math.abs(future_steps - this.currentSteps);
        let regular_pot_cost = normal_step_diff * this.stat_data.pot;
        let total_pot_cost;

        if (![this.stat.type, 'u', 'e'].includes(this.stat_data.type)) {
            bonus *= 2;
            regular_pot_cost *= 2;
        }
        
        if (change === -1) {
            regular_pot_cost *= 0.01 * this.stat.potential_return;
            bonus *= 0.01 * this.stat.bonus_potential_return;
        }
        total_pot_cost = change * (regular_pot_cost + bonus);

        return toram_round(total_pot_cost * -1);
    }

    // automation
    runFill() {
        let penalty = 1 + (this.stat.penalty || 0);
        let step_pot = penalty * this.stat_data.pot;
        this.futureSteps = this.currentSteps;
        do {
            this.runStep();
        } while (this.stat.pot > step_pot && this.futureSteps < 20) 
    }

    runStep() {
        this.futureSteps = this.currentSteps;
        this.changeValueBySteps(1, true);
        this.stat.confirm();
    }

    cleanUpValue() {
        let future_stat = parseInt(this.futureStat);
        if (this.stepsToStat(this.futureSteps) !== future_stat) {
            // invalid step... try to match intention first
            // def - 21 => def - 30
            if (future_stat % this.stat_data.step === 0) {
                this.futureSteps = future_stat / this.stat_data.step;

            // typed the step itself instead of a stat
            } else if (future_stat <= this.getMaxSteps()) {
                this.futureSteps = future_stat+ 0;

            // round down and recreate futurestat
            } else {
                this.futureSteps = toram_round(this.futureSteps);
            }

            this.futureStat = this.stepsToStat(this.futureSteps);
            document.getElementById(`input${this.slot_num}`).value = this.futureStat
            this.applyColouration();
        }
    }

    // control functions
    confirm() {
        if (this.stat_name) {
            document.getElementById(`slot${this.slot_num}`).disabled = true;
            if (!document.getElementById(`slot${this.slot_num}`).style) document.getElementById(`slot${this.slot_num}`).style = {};
            document.getElementById(`slot${this.slot_num}`).style.color = 'black';
        }

        document.getElementById(`matcost${this.slot_num}`).innerHTML = '';
        this.currentStat = parseInt(this.futureStat);
        this.currentSteps = this.futureSteps + 0;
        this.new_stat = false;
    }

    lock() {
        const slot_id = `slot${this.slot_num}`;
        const input_id = `input${this.slot_num}`;
        document.getElementById(slot_id).disabled = true;
        document.getElementById(input_id).disabled = true;
    }

    unlock() {
        if (this.disabled) return; // slot is inactive!

        const slot_id = `slot${this.slot_num}`;
        const input_id = `input${this.slot_num}`;
        if (!this.stat_name) document.getElementById(slot_id).disabled = false;
        if (this.stat_name) document.getElementById(input_id).disabled = false;
    }
}

class Stat {
    constructor(details) {
        this.slots = [
            new Slot(0, this),
            new Slot(1, this),
            new Slot(2, this),
            new Slot(3, this),
            new Slot(4, this),
            new Slot(5, this),
            new Slot(6, this),
            new Slot(7, this),
        ];  // 8 empty slots

        this.details = deep_clone(details);

        this.type = details.weap_arm;
        this.recipe_pot = parseInt(details.recipe_pot);
        this.pot = parseInt(details.starting_pot);
        this.future_pot = this.pot + 0;
        this.steps = new Formula(this);
        this.starting_pot = parseInt(details.starting_pot);

        this.mats = { Metal: 0, Cloth: 0, Beast: 0, Wood: 0, Medicine: 0, Mana: 0 };
        this.step_mats = { Metal: 0, Cloth: 0, Beast: 0, Wood: 0, Medicine: 0, Mana: 0 };

        this.max_mats = 0;
        this.step_max_mats = 0;

        this.potential_return = 5 + details.tec / 10;
        this.bonus_potential_return = 7.65 /* toram_round(3 + details.tec / 51) */;

        this.finished = false;

        this.loadDisplay();
    }

    calculatePenalty() {
        const categories = {};
        for (let slot of this.slots) {
            if (!slot.stat_name || (slot.new_stat && !slot.futureSteps)) continue;
            if (!categories[slot.stat_data.cat]) categories[slot.stat_data.cat] = 0;
            categories[slot.stat_data.cat]++;
        }
        let penalty_values = Object.keys(categories).map(c => categories[c]).map(repeats => PENALTY_DATA[repeats]);
        if (!penalty_values.length) return 1;

        let penalty = penalty_values.reduce((a, b) => a + b);
        return 1 + 0.01 * penalty;
    }

    getSuccessRate() {
        if (typeof this.finished === 'number') return this.finished
        let prev_pot = this.pot > this.recipe_pot ? this.pot : this.recipe_pot;
        
        let success_rate = 160 + (this.future_pot * 230) / prev_pot;
        if (success_rate > 100) success_rate = 100;
        if (success_rate < 0) success_rate = 0;
        return toram_round(success_rate);
    }

    onUpdate() {
        // update data
        let delta_pot = 0;
        for (let slot of this.slots) {
            if (!slot.stat_name) continue;
            delta_pot += slot.getPotentialChange();
        }

        let penalty = this.calculatePenalty();

        this.future_pot = this.pot + toram_round(penalty * delta_pot);

        this.updatePotentialSuccessDisplay();
    }

    updatePotentialSuccessDisplay() {
        document.getElementById('potential_display').innerHTML = `Potential: ${this.future_pot} / ${this.pot}`;
        document.getElementById('success_rate_display').innerHTML = `Success Rate: ${this.getSuccessRate()}%`;
        document.getElementById('confirm_button').disabled = this.pot === this.future_pot
    }

    updateMaterialCosts() {
        let buffer = `<table style="width: 100%"><tr><th style="width: 30%; text-align: left">Material</th><th style="text-align: left">Amount</th></tr>`
        for (let mat in this.mats) {
            buffer += `<tr><td>${mat}</td><td>${this.mats[mat]}</td></tr>`;
        }
        buffer += `<tr><th style="text-align: left">Highest / Step</th><td>${this.max_mats}</td></tr></table>`

        document.getElementById('material_display').innerHTML = buffer;
    }

    updateFormulaDisplay() {
        let display = this.steps.getDisplay();
        if (this.finished) display += `<br />Success Rate: ${this.getSuccessRate()}%`;
        document.getElementById('formula_display').innerHTML = `<span style="font-weight: bold; font-size: 12pt;">Steps</span><br /><br />${this.type === 'w' ? 'Weapon' : 'Armor'} - Potential: ${this.starting_pot}<br />${display}`;
        document.getElementById('redo_button').disabled = !this.steps.redo_queue.length;
        document.getElementById('undo_button').disabled = !this.steps.formula.length;
        document.getElementById('repeat_button').disabled = !this.steps.formula.length;
    }

    loadDisplay() {
        let potential = `${this.future_pot} / ${this.pot}`;
        let success_rate = this.getSuccessRate();
        let buffer = '';
        for (const slot of this.slots) {
            buffer += slot.buildDisplay() + '<br />'
        }

        const confirm = `<button onclick="App.getCurrent().confirm()" id='confirm_button' disabled>Confirm</button>`;
        const repeat = `<button id="repeat_button" onclick="App.getCurrent().repeat()" disabled>Repeat</button>`;
        const undo = `<button onclick="App.getCurrent().undo()" disabled id="undo_button">Undo</button>`;
        const redo = `<button onclick="App.getCurrent().redo()" disabled id="redo_button">Redo</button>`;

        const display = `<table><tr><td style="text-align: center" id='potential_display'>Potential: ${potential}</td></tr><tr><td>${buffer}</td></tr><tr><td style="text-align: center" id="success_rate_display">Success Rate: ${this.getSuccessRate()}%</td></tr><tr><td style="text-align: center">${confirm} ${repeat} ${undo} ${redo}</td></tr></table>`;
        document.getElementById('workspace').innerHTML = display;
        this.updateMaterialCosts();
        this.updateFormulaDisplay();
    }

    removeEmptySlots() {
        for (const slot of this.slots) {
            if (slot.new_stat && !slot.futureSteps) {
                slot.rawOverride([slot.slot_num, 0, 0]); 
            }
        }   
    }

    confirm() {
        this.removeEmptySlots();
        this.step_mats = { Metal: 0, Cloth: 0, Beast: 0, Wood: 0, Medicine: 0, Mana: 0 };
        for (const slot of this.slots) {
            if (!slot.stat_name) continue;

            // fix any bogus values and interpret what they want.
            slot.cleanUpValue();
            if (slot.currentSteps === slot.futureSteps) continue;

            const used_mat = slot.getMatType();
            const used_mat_amount = slot.getCost();

            this.mats[used_mat] += used_mat_amount;
            this.step_mats[used_mat] += used_mat_amount;

            // log down in formula what steps were
            this.steps.gatherChanges(slot.slot_num, slot.stat_name, slot.futureSteps - slot.currentSteps, slot.futureStat - slot.currentStat, slot.new_stat);
            slot.confirm();
        }

        this.step_max_mats = Object.keys(this.step_mats).map(m => this.step_mats[m]).sort((a, b) => b - a)[0];
        if (this.step_max_mats <= this.max_mats) this.step_max_mats = 0;

        this.steps.commitChanges();
        
        // update max mats
        if (this.step_max_mats) {
            this.max_mats = this.step_max_mats + 0;
            this.step_max_mats = 0;
        }

        if (this.slots.every(slot => slot.stat_name) || this.future_pot <= 0) {
            this.finished = true;
            this.lockAllSlots();
            this.updateFormulaDisplay();
            App.saveToStorage();
        } else {
            App.saveToStorage();
            this.pot = this.future_pot + 0;
        }
        
        this.updateMaterialCosts();
        this.updateFormulaDisplay();
    }

    lockAllSlots() {
        for (let slot of this.slots) {
            slot.lock();
        }

        document.getElementById('confirm_button').disabled = true;
        document.getElementById('repeat_button').disabled = true;
    }

    unlockAllSlots() {
        for (let slot of this.slots) {
            slot.unlock();
        }

        document.getElementById('confirm_button').disabled = false;
        document.getElementById('repeat_button').disabled = false;
    }

    resetToBase() {
        for (const slot of this.slots) {
            if (slot.new_stat) {
                slot.rawOverride([slot.slot_num, 0, 0]); 
            }
        }
    }

    undo() {
        if (!this.steps.formula.length) return;

        this.resetToBase();

        let last_step = this.steps.undo();
        if (this.finished) {
            this.finished = false;
            this.unlockAllSlots();
        }

        // deal with potential
        this.future_pot = last_step.pot_before + 0;
        this.pot = last_step.pot_before + 0;

        // deal with mat costs
        for (let mat in last_step.step_mats) {
            this.mats[mat] -= last_step.step_mats[mat];
        }
        this.max_mats = last_step.max_mats_before;

        // deal with stats
        const step_data = last_step.code;
        for (const instruction of step_data) {
            let slot_num = instruction[0];

            if (instruction[2]) instruction[2] = 0;
            instruction[1] *= -1;

            this.slots[slot_num].rawOverride(instruction);
        }
        
        // rebuild formula
        this.steps.buildCondensedFormula();
        this.updateFormulaDisplay();
        this.updateMaterialCosts();
        this.updatePotentialSuccessDisplay();

        App.saveToStorage();
    }

    redo() {
        let last_step = this.steps.redo();
        this.resetToBase();

        // deal with potential
        this.future_pot = last_step.pot_after+ 0;
        this.pot = last_step.pot_after + 0;

        // deal with mat costs
        for (let mat in last_step.step_mats) {
            this.mats[mat] += last_step.step_mats[mat];
        }
        this.max_mats = last_step.max_mats_after;

        // deal with stats
        const step_data = last_step.code;
        for (const instruction of step_data) {
            let slot_num = instruction[0];
            this.slots[slot_num].rawOverride(instruction);
        }
        
        if (last_step.finished) {
            this.finished = true;
            this.lockAllSlots();
        }

        // rebuild formula
        this.steps.buildCondensedFormula();
        this.updateFormulaDisplay();
        this.updateMaterialCosts();
        this.updatePotentialSuccessDisplay();

        App.saveToStorage();
    }

    repeat() {
        if (this.finished) return;
        const last_step = this.steps.formula[this.steps.formula.length - 1];
        
        for (const code of last_step.code) {
            const [slot_num, delta] = code;
            this.slots[slot_num].changeValueBySteps(delta, true);
        }

        this.confirm();
    }

    // saving
    grabSnapshot() {
        return {
            formula: deep_clone(this.steps.formula),
            settings: {
                type: this.type,
                recipe_pot: this.recipe_pot,
                future_pot: this.future_pot,
                starting_pot: this.starting_pot,
                potential_return: this.potential_return,
                bonus_potential_return: this.bonus_potential_return,
                finished: this.finished,
                max_mats: this.max_mats,
            },
        }
    }

    // override - auto updating data.
    autoLoad(data) {
        const formula = data.formula;

        this.steps.formula = formula;
        this.steps.buildCondensedFormula();

        Object.assign(this, data.settings);

        for (let step of formula) {
            this.runStepInstruction(step);
        }
    }

    runStepInstruction(instruction) {
        this.future_pot = instruction.pot_after;
        this.pot = this.finished ? instruction.pot_before : instruction.pot_after;
        
        for (let mat in instruction.step_mats) {
            this.mats[mat] += instruction.step_mats[mat];
        }

        const step_data = instruction.code;
        for (const instr of step_data) {
            let slot_num = instr[0];
            this.slots[slot_num].rawOverride(instr);
        }

        // rebuild formula
        this.steps.buildCondensedFormula();
        this.updateFormulaDisplay();
        this.updateMaterialCosts();
        this.updatePotentialSuccessDisplay();
    }
}

class Formula {
    constructor (stat) {
        this.stat = stat;
        
        this.formula = [];
        this.condensed_formula = [];

        this.step_changes = [];
        this.step_code_changes = [];

        this.redo_queue = [];
    }

    gatherChanges(slot, stat, delta_step, delta_stat, new_stat) {
        let positive = delta_step > 0 ? '+' : '';
        this.step_changes.push(`${stat} ${positive}${delta_stat}`);
        this.step_code_changes.push([slot, delta_step, (new_stat || null)]);
    }

    commitChanges() {
        if (!this.step_code_changes.length) return; // nothing changed

        const finished = this.stat.slots.every(slot => slot.stat_name) || this.stat.future_pot <= 0 ? this.getSuccessRate() : false;

        this.formula.push({
            repeat: 1,
            code: this.step_code_changes,
            text: this.step_changes.join(' '),
            pot_before: this.stat.pot,
            pot_after: this.stat.future_pot,
            step_mats: this.stat.step_mats,

            max_mats_before: this.stat.max_mats,
            max_mats_after: this.stat.step_max_mats || this.max_mats,

            finished
        })

        this.redo_queue = [];
        this.step_changes = [];
        this.step_code_changes = [];
        this.buildCondensedFormula();

    }

    buildCondensedFormula() {
        this.condensed_formula = [];
        let last_change = {};

        for (let step of this.formula) {
            if (last_change.text && last_change.text === step.text) {
                let target_step = this.condensed_formula[this.condensed_formula.length - 1];
                target_step.repeat++;
                target_step.pot_after = step.pot_after;
            } else {
                this.condensed_formula.push(deep_clone(step));
                last_change = step;
            }
        }
    }    

    getDisplay() {
        const display = this.condensed_formula.map((step, index) => `#${index + 1}. ${step.text}${step.repeat > 1 ? ` (x${step.repeat})` : ''} <span style="color: gray">(${step.pot_after}pot)</span>`);
        return display.join('<br />')
    }

    undo() {
        let step = this.formula.pop();
        this.redo_queue.push(deep_clone(step));
        return step;
    }

    redo() {
        let step = this.redo_queue.pop();
        this.formula.push(deep_clone(step));
        return step;
    }
}

class MainApp {
    constructor() {
        this.stats = {};

        this.current = null;
    }

    loadFromStorage() {
        let raw_data = localStorage.getItem('instance_data');
        if (!raw_data) return;

        let data;
        try {
            data = JSON.parse(raw_data)
        } catch (e) {}

        if (!data) return;

        // recreate each stat and run overrides to apply each step.
        for (let wid in data) {
            let instance_data = data[wid];
            let stat = this.spawn(wid);

            stat.autoLoad(instance_data);
        }
    }

    saveToStorage() {
        let data_to_store = {};
        for (let id in this.stats) {
            data_to_store[id] = this.stats[id].grabSnapshot();
        }

        localStorage.setItem('instance_data', JSON.stringify(data_to_store));
    }

    getNewWorkspaceId() {
        let id = 0;
        do {
            id++
        } while (this.stats['Stat_' + id])
        return 'Stat_' + id;
    }

    updateNavigationBar() {
        if (!Object.keys(this.stats).length) {
            document.getElementById('navigation_bar').hidden = true;
        } else {
            let display = this.buildNavigationBar();
            document.getElementById('navigation_bar').innerHTML = display;
            document.getElementById('navigation_bar').hidden = false;
        }

        document.getElementById('rename_button').disabled = !this.current;
        document.getElementById('duplicate_button').disabled = !this.current;
    }

    buildNavigationBar() {
        let buffer = [];
        for (const workspace_id in this.stats) {
            const instance = this.stats[workspace_id]
            const focused = workspace_id === this.current;

            buffer.push(`<div style="display: inline-block; border: solid 1px blue; border-radius: 7px; padding: 3px;${focused ? ' background-color: lightpink' :' background-color: none'}"><button style="border: none; background: none" onclick="App.setCurrent('${workspace_id}')">${workspace_id}</button><button onclick="App.despawn('${workspace_id}')" style="color: red; border: none; background: none">x</button></div>`);
        }
        return buffer.join(' ')
    }

    promptRename() {
        let new_name = prompt(`What shall we name this current stat instance? Current name: ${this.current}`);

        if (!new_name) return;
        if (this.stats[new_name]) return alert('The name you selected is already in use by another stat instance.');

        this.stats[new_name] = this.stats[this.current];
        delete this.stats[this.current];
        this.current = new_name;
        this.updateNavigationBar();
    }

    spawn(id) {
        const starting_pot = document.getElementById('starting_pot').value;
        const recipe_pot = document.getElementById('recipe_pot').value;
        const weap_arm = document.getElementById('weap_arm').value;
        const workspace_id = id || this.getNewWorkspaceId();

        const details = {
            weap_arm,
            starting_pot,
            recipe_pot,
            workspace_id,
            tec: 255,
            proficiency: 0,
        };

        this.stats[workspace_id] = new Stat(details);
        document.getElementById('workbench').hidden = false;
        this.current = workspace_id;

        this.updateNavigationBar();
        if (!id) this.saveToStorage();
        return this.stats[workspace_id];
    }

    despawn(workspace_id) {
        if (!this.stats[workspace_id]) return;

        if (this.current === workspace_id) {
            document.getElementById('workbench').hidden = true;
            this.current = null;
        }

        delete this.stats[workspace_id];
        this.updateNavigationBar();
        this.saveToStorage();
    }

    getCurrent() {
        return this.stats[this.current];
    }

    setCurrent(value) {
        if (this.current === value) return;

        this.current = value;
        document.getElementById('workbench').hidden = false;

        // code for updating display
        const current = this.getCurrent();
        current.updateFormulaDisplay();
        current.updateMaterialCosts();
        current.updatePotentialSuccessDisplay();
        
        for (let slot of current.slots) {
            slot.syncDisplayWithValues();
        }
        this.updateNavigationBar();

        document.getElementById('confirm_button').disabled = !!current.finished;
        document.getElementById('repeat_button').disabled = !!current.finished;
    }

    duplicateCurrent() {
        let current_data = this.getCurrent().grabSnapshot();
        this.spawn(`Copy of ${this.current}`).autoLoad(current_data);
        this.saveToStorage();
    }
    
    reset() {
        this.current = null;
        this.stats = {};
        this.updateNavigationBar();
        document.getElementById('workbench').hidden = true;

        this.saveToStorage();
    }
}

const App = new MainApp();

function show_help() {
    alert(
        `Hotkeys (may not work on mobile)\nA - set value to max\nS - increase value by 1 stepwise and confirm\nD - set value to min\nF - repeat stepwise addition of stats until you hit +20, or right before you run out of potential\nR - undo the last step.\nQ / Up_Arrow - increase stat by 1 step, without confirming\nW / Down_Arrow - decrease stat by 1 step, without confirming`
    )
}
