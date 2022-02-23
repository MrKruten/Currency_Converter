import {
	createEffect,
	createEvent,
	createStore,
	guard,
	sample,
} from 'effector';

export const switchChanged = createEvent<boolean>();

const isSwitchActive = createStore<boolean>(false).on(
	switchChanged,
	(_, switchState) => switchState
);

// Пока что не реализованно

/* const isActive = guard({
	clock: isSwitchActive,
	filter: clock => clock,
});

const isInactive = guard({
	clock: isSwitchActive,
	filter: clock => !clock,
});

const setCurrentThemeFx = createEffect<boolean, void, Error>(switchState => {
	console.log(switchState);
	if (switchState) document.body.classList.add();
});

sample({
	clock: [isActive, isInactive],
	target: setCurrentThemeFx,
}); */
