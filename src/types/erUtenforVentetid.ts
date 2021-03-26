import ObjectBase from './objectBase';

class ErUtenforVentetid extends ObjectBase<ErUtenforVentetid> {
    readonly erUtenforVentetid: boolean;

    constructor(data: any) {
        super(data, 'ErUtenforVentetid');

        this.erUtenforVentetid = this.getRequiredBoolean('erUtenforVentetid');
    }
}

export default ErUtenforVentetid;
