/**
 * Created by girl on 16/5/25.
 */
import core from './core.js';
"use strict"
const Gost = (obj,date="") => {
    core(obj,{type:"GET",date:date});
}

module.exports =  Gost;
