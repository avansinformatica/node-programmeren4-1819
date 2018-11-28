
const myConst = 4

/**
 * Eerste object
 */
let myLet = {
	firstName: 'Robin',
	lastName: 'Schellius',
	email: 'r.schellius@avans.nl',
	adres: {
		straat: 'hier',
		nr: 5,
		postcode: {
			cijfers: '2345',
			letters: 'GH'
		} 
	},
	telefoon: [
		{
			nr: '0918345019845',
			toelichting: 'Thuis'
		},{
			nr: '9817598715',
			toelichting: 'Werk'
		}
	]
}

// Functiedeclaratie
// Fat-arrow of Lambda-functie
const printAdres = (input) => {
	console.log(input.adres.straat + ' ' + input.adres.nr)
}

const geefStraatnaam = (input, callback) => {
	setTimeout(() => {
		callback(input.adres.straat + ' ' + input.adres.nr) 
	 }, 4000);
}

const func2 = () => { }

// Aanroep
func2()
// printAdres(myLet)

geefStraatnaam(myLet, (straatnaam) => {
	console.log('Mijn straat is ' + straatnaam)
})
