"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var prepareData_1 = require("./utiles/prepareData");
var util_1 = require("./utiles/util");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/search_N_days_data_ex1', function (req, res) {
    var days = req.body.days;
    var final_obj = (0, util_1.fillMissingMetrics)(prepareData_1.example1, days);
    res.json(final_obj);
});
app.get('/search_N_days_data_ex2', function (req, res) {
    var days = req.body.days;
    var final_obj = (0, util_1.fillMissingMetrics)(prepareData_1.example2, days);
    res.json(final_obj);
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start the server
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
    console.log("Press Ctrl+C to stop");
});
//# sourceMappingURL=app.js.map