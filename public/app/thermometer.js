/*
* This angular module is derived from code found on CodePen see README.md for copyright notice of original work.
* */
let thermometerApp =  angular.module('t66thermometer', ["firebase"]);
var firedb = firebase.database();

thermometerApp.run(['thermometerDb', function(thermometerDb) {
    thermometerDb.initDB();
}]);

thermometerApp.component('t66thermometer', {
    templateUrl: 'app/thermometer.html',
    controller: ['thermometerDb',thermometerController]
});

function thermometerController(thermometerDb) {
   const _this = this;

   _this.$onInit = function() {
       thermometerDb.getGoal().then(function(goal){
           _this.goal = goal;
       });
   };

   _this.currentTotal = function() {
       const donations = thermometerDb.donations;
       let total = 0;
       for (let i=0; i < donations.length; ++i) {
           total += donations[i];
       }
       return total;
   };

   _this.percent = function() {
       return ((_this.currentTotal() / _this.goal)*100) + '%';
   }
}