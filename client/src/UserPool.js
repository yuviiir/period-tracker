import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_vI4p8T0TI",
    ClientId: "6nf9gjhf7sf2cdda9m2v85shgg"
}

export default new CognitoUserPool(poolData);