describe('Accordion', () => {
    let accordion;

    // Increase the timeout for beforeEach
    beforeEach(async () => {
        document.body.innerHTML = `<accordion-component></accordion-component>`;
        await customElements.whenDefined('accordion-component');
        accordion = document.querySelector('accordion-component');
    }, 10000); // Increased timeout to 10 seconds

    test('it fetches data and displays posts', async () => {
        // Mock the fetch call
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ title: 'Post 1', body: 'Body 1' }]),
            })
        );

        await accordion.fetchData();

        // Expect the accordion to have content after fetching data
        const items = accordion.querySelectorAll('.accordion-item');
        expect(items.length).toBeGreaterThan(0);
        expect(items[0].textContent).toContain('Post 1');
    });
});
