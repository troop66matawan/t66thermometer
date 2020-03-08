thermometerApp.service('thermometerDb', thermometerDb);

function thermometerDb($q,$rootScope) {
    const _this = this;
    const initializationPromise = $q.defer();
    _this.initialized = initializationPromise.promise;
    _this.donations = [];
    _this.needApply = true;

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
            console.log(JSON.stringify(dbInst));
            _this.donations = _this.firePropsToArray(dbInst);
            if (_this.needApply) {
                $rootScope.$apply();
            }
            _this.needApply = true;
        });
    };
    _this.addDonation = function(name, amount) {
        const entry = {
            index: _this.donations.length,
            name: name,
            value: Number(amount),
        };
        _this.donations.push(entry);
        const firebaseDonation = {};
        for (let i =0; i < _this.donations.length; ++i) {
            const donation = angular.copy(_this.donations[i]);
            delete donation.$$hashKey;
            const index = angular.copy(donation.index);
            delete donation.index;
            firebaseDonation[index] = donation;
        }
        _this.needApply = false;
        _this.donationRef.set(firebaseDonation);
    };
    _this.firePropsToArray = function(fireprops) {
        const donations = [];
        for (const index in fireprops) {
            if (fireprops.hasOwnProperty(index)) {
                const entry = {
                    index: index,
                    name: fireprops[index].name,
                    value: fireprops[index].value
                };
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