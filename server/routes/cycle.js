const { json } = require("express");
const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;

router.route("").get(async (req, res) => {

    let username = res.locals.username;

    const conn = new MongoClient(url);
    await conn.connect();
  
    db = conn.db("PeriodTracker");
  
    if (!db) {
      res.status(500).send({ err: "Internal db error on get connection" });
      return;
    }
  
    try {
      let mongoRes = await db
        .collection("journal").find({ username: username })
        .toArray();

      const sortedAsc = mongoRes.sort(
        (objA, objB) => Number(objA.date) - Number(objB.date),
      );

      const sortedDesc = mongoRes.sort(
        (objA, objB) => Number(objB.date) - Number(objA.date),
      );

      let avgCycleLength = 0;
      let dayInCycle = -1;
      let avgPeriodLength = 0;

      try {
        avgCycleLength = AvgCycleLength(sortedAsc);
      } catch {}

      try {
        dayInCycle = DayInCylce(sortedDesc);
      } catch {}

      try {
        avgPeriodLength = AvgPeriodLen(sortedAsc);
      } catch (err) {
        console.log("Error" + err);
      }

      res.status(200).send({
        avgCycleLength: avgCycleLength,
        dayInCycle: dayInCycle,
        avgPeriodLength: avgPeriodLength,
        nextPeriodDay: avgPeriodLength - dayInCycle
      });

    } catch (e) {
      res.status(500).send({ err: "Internal db error on get connection" });
      return;
    }
    
  });

  function AvgCycleLength(periodData)
  {
    let lengthArray = [];

    let startDate;
    let endDate;

    periodData.forEach(element => {
      //Ignore bad spelling
      let perioddate = element.periodDateType

      if(perioddate == 1 && !startDate) //Start
      {
        startDate = element.date;
        console.log("startDate: " + startDate);
      }
      else if(perioddate == 2 && !endDate) //End
      {
        endDate = element.date;
        console.log("endDate: " + endDate);
      }
      
      if(!!startDate && !!endDate)
      {
        const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        lengthArray.push(diffDays);

        startDate = null;
        endDate = null;
      }
    });

    let resultSum = lengthArray.reduce((partialSum, a) => partialSum + a, 0);
    
    return resultSum/lengthArray.length;
  }

  function DayInCylce(periodData)
  {
    let startDate;

    periodData.forEach(element => {
      let perioddate = element.periodDateType

      if(!!startDate)
      {
        return;
      }     

      if(perioddate == 1 && !startDate) //Start
      {
        startDate = element.date;
        console.log("startDate: " + startDate);
      }           
    });

    const diffTime = Math.abs(new Date() - new Date(startDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log("CYCLE DAY:" + diffDays);

    return diffDays;
  }

  function AvgPeriodLen(periodData)
  {
    let lengthArray = [];

    let prevStartDate;

    periodData.forEach(element => {
      let perioddate = element.periodDateType

      if(perioddate == 1 && !prevStartDate) //Start
      {
        prevStartDate = element.date;
        console.log("Found prev day: " + prevStartDate);
        return;
      }
      
      if(!!prevStartDate && perioddate == 1) //Have prev and have current
      {
        const diffTime = Math.abs(new Date(element.date) - new Date(prevStartDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        lengthArray.push(diffDays);

        prevStartDate = null;
      }
    });

    let resultSum = lengthArray.reduce((partialSum, a) => partialSum + a, 0);

    console.log("SUM:" + resultSum);
    
    return resultSum/lengthArray.length;
  }

module.exports = router;
