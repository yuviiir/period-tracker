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

      let avgCycleLength = AvgCycleLength(sortedAsc);
      let dayInCylce = DayInCylce(sortedDesc);
      let avgPeriodLen = avgPeriodLen(sortedAsc);

      res.status(200).send({
        avgCycleLength: avgCycleLength,
        dayInCylce: dayInCylce,
        avgPeriodLen: avgPeriodLen
      
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

  function avgPeriodLen(periodData)
  {
    let lengthArray = [];

    let prevStartDate;

    periodData.forEach(element => {
      let perioddate = element.periodDateType

      if(perioddate == 1 && !startDate) //Start
      {
        startDate = element.date;
        console.log("startDate: " + startDate);
      }
      
      if(!!startDate && !!endDate)
      {
        const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        lengthArray.push(diffDays);

        startDate = null;
      }
    });
  }

module.exports = router;
