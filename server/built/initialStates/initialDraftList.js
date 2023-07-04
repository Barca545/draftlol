"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialDraftList = void 0;
var initialTop_1 = require("./initialTop");
var initalMid_1 = require("./initalMid");
var initalJungle_1 = require("./initalJungle");
var initalBottom_1 = require("./initalBottom");
var initialSupport_1 = require("./initialSupport");
var initalAllChamps_1 = require("./initalAllChamps");
exports.initialDraftList = {
    blueBans: [
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
    ],
    bluePicks: [
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
    ],
    redBans: [
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
    ],
    redPicks: [
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
        { champ: null, icon: "https://draftlol.dawe.gg/rectangle.png" },
    ],
    turn: 'Blue',
    phase: 'Ban',
    champList: initalAllChamps_1.initalAllChamps,
    topList: initialTop_1.initalTop,
    jgList: initalJungle_1.initalJungle,
    midList: initalMid_1.initalMid,
    bottomList: initalBottom_1.intialBottom,
    supportList: initialSupport_1.initialSupport,
};
