
thermometerApp.component('donationEntry', {
    templateUrl: 'app/donationEntry.html',
    controller: ['$scope','$window','thermometerDb',donationEntryController]
});

function donationEntryController($scope, $window, thermometerDb) {
    const _this = this;

    _this.addDonation = function() {
        const entry = {
            name: _this.name,
            value: Number(_this.amount),
        };
        thermometerDb.donations.push(entry);
        _this.name=undefined
        _this.amount = undefined;
        $scope.donationForm.$setPristine();
        $window.document.getElementById('entry-name').focus();
        console.log(JSON.stringify(thermometerDb.donations));

    }
}