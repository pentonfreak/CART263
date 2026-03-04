document.querySelectorAll('.panel').forEach(panel => {
	panel.addEventListener('mousemove', (e) => {
		const rect = panel.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		panel.style.setProperty('--mouse-x', `${x}px`);
		panel.style.setProperty('--mouse-y', `${y}px`);
	});

	panel.addEventListener('mouseleave', () => {
		panel.style.setProperty('--mouse-x', '50%');
		panel.style.setProperty('--mouse-y', '50%');
	});
});
