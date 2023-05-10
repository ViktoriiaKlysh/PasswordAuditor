class PasswordAuditor {
    _setLowerCyrillic = /[а-яґєії]/;
    _setUpperCyrillic = /[А-ЯҐЄІЇ]/;
    _setNumbers = /\d/;
    _setSymbols = /[{}:;"|~`]/;

    ///Перевірка наборів

    checkNumbers(_password) {
        return this._setNumbers.test(_password);
    }

    checkLowerCyrillicAlphabeth(_password) {
        return this._setLowerCyrillic.test(_password);
    }

    checkUpperCyrillicAlphabeth(_password) {
        return this._setUpperCyrillic.test(_password);
    }

    checkSymbols(_password) {
        return this._setSymbols.test(_password);
    }

    secure_pass(_password) {
        const lowerCyrillicMatches = _password.match(this._setLowerCyrillic);
        const upperCyrillicMatches = _password.match(this._setUpperCyrillic);
        const numberMatches = _password.match(this._setNumbers);
        const specialSymbolMatches = _password.match(this._setSymbols);
        const lengthMatches = _password.match(/^.{11,}$/);

        return lowerCyrillicMatches?.length >= 1 && upperCyrillicMatches?.length >= 1
            && numberMatches?.length >= 1 && specialSymbolMatches?.length >= 1
            && lengthMatches?.length === 1;
    }

    secure_pass2(_password) {
        const lowerCyrillicMatches = _password.match(this._setLowerCyrillic);
        const upperCyrillicMatches = _password.match(this._setUpperCyrillic);
        const numberMatches = _password.match(this._setNumbers);
        const specialSymbolMatches = _password.match(this._setSymbols);

        const sets = [lowerCyrillicMatches, upperCyrillicMatches, numberMatches, specialSymbolMatches];
        const usedSets = sets.filter(set => set !== null).length;

        const passwordLength = _password.length;
        if (passwordLength >= 11 && usedSets >= 2) {
            return true;
        }

        return false;
    }
}

module.exports = PasswordAuditor;