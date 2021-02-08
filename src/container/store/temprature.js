import { observable, computed, decorate } from 'mobx';

class Temprature {
    unit = 'C';
    tempratureCelcius = 25;

    get tempratureKelvin() {
        return this.tempratureCelcius * (9 / 5) + 32;
    }

    get temprature() {
        switch (this.unit) {
            case 'K': return this.tempratureKelvin + 'K'
            case 'C': return this.tempratureCelcius + 'C'
            default: return null
        }
    }
}

decorate(Temprature, {
    unit: observable,
    tempratureCelcius: observable,
    tempratureKelvin: computed,
    temprature: computed
})

export default new Temprature();