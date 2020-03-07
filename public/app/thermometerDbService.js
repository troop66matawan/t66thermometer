thermometerApp.service('thermometerDb', thermometerDb);

function thermometerDb($q,$rootScope) {
    const _this = this;
    const initializationPromise = $q.defer();
    _this.initialized = initializationPromise.promise;
    _this.donations = [];

    _this.initDB = function() {
        _this.dbRef = firedb.ref('event/2020CakeAuction');
        _this.dbRef.on('value', function(curSnapshot) {
            initializationPromise.resolve();
            const dbInst = curSnapshot.val();
            _this.goal = dbInst.Goal;
        });
        _this.donationRef = firedb.ref('event/2020CakeAuction/Donations');
        _this.donationRef.on('value', function(curSnapshot) {
            const dbInst = curSnapshot.val();
            _this.donations = _this.firePropsToArray(dbInst);
            console.log(_this.donations);
            $rootScope.$apply();
        });
    };
    _this.firePropsToArray = function(fireprops) {
        const donations = [];
        for (const donation in fireprops) {
            if (fireprops.hasOwnProperty(donation)) {
                const entry = fireprops[donation];
                donations.push(entry);
            }
        }
        return donations;
    };
    _this.getGoal = function() {
        const defer = $q.defer();
        let rv =0;
        _this.initialized.then(function() {
            defer.resolve(_this.goal);
        });
        return defer.promise;
    }
}