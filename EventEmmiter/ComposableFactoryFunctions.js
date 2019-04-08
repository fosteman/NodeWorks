/*Pattern: composable factory functions. A particular type of factory function that can be composed together to beuild new enhanced factory functions, to construct objects that inherit behaviors and properties from different sources without the need fpr beuild class hierarchies.

Sources used:
https://medium.com/@koresar/fun-with-stamps-episode-1-stamp-basics-e0627d81efe0
https://medium.com/javascript-scene/introducing-the-stamp-specification-77f8911c2fee
Example: videogame in which the characters on the screen can have a number of different behaviors: they can move on the screen; they can slash and shoot. And yes, to be a character they should have some basic properties such as life points, position on the screen, and name.
*/
const stampit = require('stampit');

const BaseCharacter = stampit()
	.props(
	{
		name: 'base',
		hp: 100,
		pos_x: 0,
		pos_y: 0
	});
const BaseMover = stampit()
	.methods({
		move(x, y) {
			this.pos_x += x; //'this' is accessable from inside the method.
			this.pos_y += y;
			console.log(`${this.name} has moved to [${this.x}, ${this.y}]`);
		}
	});
const BaseSlasher = stampit()
	.methods({
		slash(direction) {
			console.log(`${this.name} slashed to the ${direction}`);
		}
	});
const BaseShooter = stampit()
	.props({
		bullets: 6
	})
	.methods({
		shoot(direction) {
			if (this.bullets > 0) {
				--this.bullets;
				console.log(`${this.name} shoot to the ${direction}`);
			}
		}
	});
//Composition of factory functions, based on methods, and properties of inherited factories
const runner = stampit.compose(BaseCharacter, BaseMover);
const samurai = stampit.compose(BaseCharacter, BaseMover, BaseSlasher);
const sniper = stampit.compose(BaseCharacter, BaseShooter);

const gunslinger = stampit.compose(BaseCharacter, BaseMover, BaseShooter);
const westernSamurai = stampit.compose(gunslinger, samurai);

//play
const gojiro = westernSamurai();
gojiro.name = 'Gojiro Kiryu';
gojiro.move(1,0);
gojiro.slash('left');
gojiro.shoot('right');

