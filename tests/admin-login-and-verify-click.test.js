const timeout = 15000;
// série de tests sur la page d'accueil
describe("Tests admin Sign In and verify click", () => {
    let page;

    // vérification du login en admin
    test('test sign in/verify click', async () => {
        //Sign In
        // charger la page d'accueil
        await page.goto('http://polr.stationmyr.net');
        // récupérer le contenu de l'élément <navbar>
        await page.waitForSelector('#navbar li a');
        // click sur le lien "Sign In" de la navigation
        await page.click('.dropdown-toggle');
        await page.waitForSelector('#navbar form [name="username"]');
        await page.type('#navbar form [name="username"]', 'admin');
        await page.waitForSelector('#navbar form [name="password"]');
        await page.type('#navbar form [name="password"]', 'campus');
        await page.click('#navbar form [name="login"]');
        await page.waitForSelector('.login-name');
        const html = await page.$eval('.login-name', e => e.innerHTML);
        expect(html).toContain("admin");

        await page.screenshot({path: './tests/img/admin-login.png'});

        //Vérifier l'incrémentation des Clicks
        await page.goto('http://polr.stationmyr.net/admin#admin');

        //Récupérer le numéro du LinkEnding
        await page.waitForSelector('#admin_links_table tbody tr td:nth-of-type(3)');
        const linkEnding = await page.$eval('#admin_links_table tbody tr td:nth-of-type(1)', e => e.innerHTML);
        console.log("linkEndind %o:", linkEnding);

        //Récupérer le nombre de clicksBefore avant
        await page.waitForSelector('#admin_links_table tbody tr td:nth-of-type(3)');
        const clicksBefore = await page.$eval('#admin_links_table tbody tr td:nth-of-type(3)', e => e.innerHTML);
        console.log("clicksBefore %o:", clicksBefore);
        await page.screenshot({path: './tests/img/admin-clicks-before.png'});

        //Incrémenter le nombre de click du linkEnding
        const URL = 'http://polr.stationmyr.net/';
        console.log(URL + linkEnding);
        await page.goto(URL + linkEnding);
        await page.goto('http://polr.stationmyr.net/admin#admin');

        //Récupérer le nombre de clicksAfter apres
        await page.waitForSelector('#admin_links_table tbody tr td:nth-of-type(3)');
        const clicksAfter = await page.$eval('#admin_links_table tbody tr td:nth-of-type(3)', e => e.innerHTML);
        console.log("clicksAfter %o:", clicksAfter);
        await page.screenshot({path: './tests/img/admin-clicks-after.png'});

        //Tranformer les "String" en "Int"
        const clicksAfterInt = parseInt(clicksAfter);
        const clicksBeforeInt = parseInt(clicksBefore);

        expect(clicksAfterInt).toBeGreaterThan(clicksBeforeInt);

    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)
});