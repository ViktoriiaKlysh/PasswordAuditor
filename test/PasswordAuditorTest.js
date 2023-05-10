const PasswordAuditor = require('../classes/PasswordAuditor');
const expect = require('chai').expect;

let pass = new PasswordAuditor();
//////////////////////////Перевірка наборів/////////////////////////////
// describe("Numbers_Test", function () {
//     it('should return true if password consists only of digits', function () {
//         const _password = "5236936";
//         let output = pass._setNumbers.test(_password);
//         expect(output).to.equal(true);
//     });
// });
// describe("Lower_Cyrillic_Test", function () {
//     it('should return true if password contains at least one lower case Cyrillic letter', function () {
//         const _password = "Пароль5236936";
//         let output = pass._setLowerCyrillic.test(_password);
//         expect(output).to.equal(true);
//     });
// });
// describe("Upper_Cyrillic_Test", function () {
//     it('should return true if password contains at least one upper case Cyrillic letter', function () {
//         const _password = "Пароль5236936";
//         let output = pass._setUpperCyrillic.test(_password);
//         expect(output).to.equal(true);
//     });
// });
// describe("Symbols_Test", function () {
//     it('should return true if password contains at least one symbol', function () {
//         const _password = "Пароль5236936}";
//         let output = pass._setSymbols.test(_password);
//         expect(output).to.equal(true);
//     });
// });

//////////////////////////Перевірка методів/////////////////////////////

describe("Tests methods", function () {
    describe("checkLowerCyrillicAlphabeth", function () {
        it('should return true if password contains at least one lower case Cyrillic letter', function () {
            const password = "сорока414";
            const output = pass.checkLowerCyrillicAlphabeth(password);
            expect(output).to.equal(true);
        });

        it('should return false if password does not contain lower case Cyrillic letter', function () {
            const password = "СОРОКА414";
            const output = pass.checkLowerCyrillicAlphabeth(password);
            expect(output).to.equal(false);
        });
    });

    describe("checkUpperCyrillicAlphabeth", function () {
        it('should return true if password contains at least one upper case Cyrillic letter', function () {
            const password = "СОРОКА414";
            const output = pass.checkUpperCyrillicAlphabeth(password);
            expect(output).to.equal(true);
        });

        it('should return false if password does not contain upper case Cyrillic letter', function () {
            const password = "сорока414";
            const output = pass.checkUpperCyrillicAlphabeth(password);
            expect(output).to.equal(false);
        });
    });

    describe("checkNumbers", function () {
        it('should return true if password contains at least one number', function () {
            const password = "сорока414";
            const output = pass.checkNumbers(password);
            expect(output).to.equal(true);
        });

        it('should return false if password does not contain a number', function () {
            const password = "сорокаaaa";
            const output = pass.checkNumbers(password);
            expect(output).to.equal(false);
        });
    });

    describe("checkSymbols", function () {
        it('should return true if password contains at least one symbol', function () {
            const password = "сорока~414";
            const output = pass.checkSymbols(password);
            expect(output).to.equal(true);
        });

        it('should return false if password does not contain a symbol', function () {
            const password = "сорока414";
            const output = pass.checkSymbols(password);
            expect(output).to.equal(false);
        });
    });
})
//////////////////////////Перевірка чи відповідає пароль 4 наборам/////////////////////////////
describe("secure_pass()", function () {
    it('function returns true if password contains four sets and a password length of 11 or more', function () {
        const _password = "Ворона{2525}";
        let output = pass.secure_pass(_password);
        expect(output).to.equal(true);
    });

    it('function returns false if password does not contains four sets and a password length of 11 or more', function () {
        const _password = "Ворона25250";
        let output = pass.secure_pass(_password);
        expect(output).to.equal(false);
    });
});

////////////////////Перевірка чи відповідає пароль мінімум 2 наборам та довжині паролю 11 символів або більше////////////////////////
describe("secure_pass2()", function () {
    it('function returns true if password contains a minimum of two sets and a password length of 11 or more', function () {
        const _password = "ворона4949494";
        let output = pass.secure_pass2(_password);
        expect(output).to.equal(true);
    });

    it('function returns false if password does not contains a minimum of two sets and a password length of 11 or more', function () {
        const _password = "49494949494";
        let output = pass.secure_pass2(_password);
        expect(output).to.equal(false);
    });
});


//////////////////////////Тест для перевірки продуктивності роботи/////////////////////////////
describe("Performance Test", function () {
    it("should check the time required for password security verification based on password length", function () {
        const passwords = [
            "ВОРОНА:5145481",
            "чашкачаю:0111105",
            "дракон:Місячне:63:сяйво",
            "танцювала:2:риба:63:з:78:раком;",
            "немертветещовічнопробуває|Азвічністьюбуваісмертьсамавмирає"
        ];

        let results = [];

        for (let i = 0; i < passwords.length; i++) {
            const password = passwords[i];

            const startTime = performance.now();
            const result = pass.secure_pass2(password);
            const endTime = performance.now();

            expect(result).to.equal(true);
            results.push(endTime - startTime);
        }
        console.log(results.map(r => r.toFixed(2) + 'ms'));
    });
});
