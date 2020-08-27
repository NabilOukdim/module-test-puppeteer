const timeout = 15000;

// série de tests sur la page d'accueil
describe("Register", () => {
    let page;
    let selector = 'input[name="username"]';

    // vérification du chargement de la page d'accueil
    test('register', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.stationmyr.net');
        // récupérer le contenu de l'élément <navbar>
        await page.waitForSelector('#navbar li a');
        // click sur le lien "Sign In" de la navigation
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign Up')[0].click();
        });
        await page.waitForSelector('.container form [name="username"]');
        await page.type('.container form [name="username"]', 'nabil');
        await page.waitForSelector('.container form [name="password"]');
        await page.type('.container form [name="password"]', '123456');
        await page.waitForSelector('.container form [name="email"]');
        await page.type('.container form [name="email"]', 'nabil.oukdim@le-campus-numerique.fr');

        const html = await page.$eval('.container', e => e.innerHTML);
        expect(html).toContain("Register");

        // click sur le bouton register
        await page.click('.container form [value="Register"]');
        await page.screenshot({path: './tests/img/register.png'});
    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)
});
