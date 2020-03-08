
thermometerApp.component('donationEntry', {
    templateUrl: 'app/donationEntry.html',
    controller: ['$scope','$window','thermometerDb',donationEntryController]
});

function donationEntryController($scope, $window, thermometerDb) {
    const _this = this;

    _this.addDonation = function() {
        const amount = Number(_this.amount);
        if (!isNaN(amount)) {
            thermometerDb.addDonation(_this.name, amount);
            _this.name = undefined
            _this.amount = undefined;
            $scope.donationForm.$setPristine();
            $window.document.getElementById('entry-name').focus();
        }
    }
}