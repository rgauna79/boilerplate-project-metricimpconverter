const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");
const { test } = require("mocha");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Read a Decimal number input", function (done) {
      let input = "3.2L";
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });

    test("Read a Fractional input", function (done) {
      let input = "1/2km";
      assert.equal(convertHandler.getNum(input), 1 / 2);
      done();
    });

    test("Read a Fractional input with a decimal", function (done) {
      let input = "1/2.2km";
      assert.equal(convertHandler.getNum(input), 1 / 2.2);
      done();
    });

    test("Invalid input (double fraction)", function (done) {
      let input = "1/2/2km";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });
    test("No numerical input", function (done) {
      let input = "km";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input", function () {
    test("For each valid input", function (done) {
      let input = [
        "gal",
        "l",
        "km",
        "mi",
        "kg",
        "lbs",
        "GAL",
        "L",
        "KM",
        "MI",
        "KG",
        "LBS",
      ];
      let output = [
        "gal",
        "L",
        "km",
        "mi",
        "kg",
        "lbs",
        "gal",
        "L",
        "km",
        "mi",
        "kg",
        "lbs",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });
    test("Unknown unit input", function (done) {
      let input = "32g";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });
    test("Return unit for each valid input", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let output = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getReturnUnit(ele), output[index]);
      });
      done();
    });
    test("Return correct string unit for each valid input", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let output = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.spellOutUnit(ele), output[index]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("L to Gal", function (done) {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Mi to Km", function (done) {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Km to Mi", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Lbs to Kg", function (done) {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
    test("Kg to Lbs", function (done) {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});
