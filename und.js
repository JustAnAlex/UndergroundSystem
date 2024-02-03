class UndergroundSystem {
  _journeys = new Map();
  _stations = new Map();

  _getKey(startStation, endStation) {
    return [startStation, endStation].sort().join('_');
  }

  checkIn(id, stationName, time) {
    this._stations.set(id, { stationName, time });
  }
  
  checkOut(id, stationName, time) {
    const prevStation = this._stations.get(id);
    if (!prevStation) return;

    const key = this._getKey(prevStation.stationName, stationName);
    const journey = this._journeys.get(key) ?? { totalTime: 0, count: 0 };
    const journeyTime = time - prevStation.time;

    this._journeys.set(key, { totalTime: journey.totalTime + journeyTime, count: journey.count + 1 });
    this._stations.delete(id);
  }
  
  getAverageTime(startStation, endStation) {
    const key = this._getKey(startStation, endStation);
    const journey = this._journeys.get(key);

    if (journey) return journey.totalTime / journey.count;
  }
}


const undergroundSystem = new UndergroundSystem();
undergroundSystem.checkIn(1, 'Leyton', 11);
undergroundSystem.checkIn(1, 'Leyton', 10);
undergroundSystem.checkOut(1, 'Waterloo', 20); // 10

undergroundSystem.checkIn(1, 'Waterloo', 23);
undergroundSystem.checkOut(1, 'Leyton', 26); // 3

undergroundSystem.checkIn(2, 'Leyton', 25);
undergroundSystem.checkOut(2, 'Waterloo', 30); //5 
// 18 /3 = 6

undergroundSystem.checkIn(1, 'Leyton', 15);
undergroundSystem.checkOut(1, 'Kaspiy', 22); // 7

console.log(undergroundSystem.getAverageTime('Leyton', 'Waterloo') ); // 6
console.log(undergroundSystem.getAverageTime('Waterloo', 'Leyton') );// 6

