
thermometerApp.component('donationView', {
    templateUrl: 'app/donationView.html',
    controller: ['thermometerDb',donationViewController]
});

function donationViewController(thermometerDb) {
    const _this = this;

    _this.getDonations = function() {
        return thermometerDb.donations;
    }
}