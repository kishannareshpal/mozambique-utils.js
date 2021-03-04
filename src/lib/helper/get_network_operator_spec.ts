import { NetworkOperator, NetworkOperatorSpec } from "../helper/type/types";

/**
 * Get the details for a network operator.
 * 
 * @param networkOperator the network operator enum
 * @returns {object} details about the specified network operator in mozambique.
 */
const get_network_operator_spec = (networkOperator: NetworkOperator): NetworkOperatorSpec => {
    switch (networkOperator) {
    case "vodacom":
        return {
            name: "Vodacom Moçambique",
            shortName: "Vodacom"
        };

    case "movitel":
        return {
            name: "Movitel, S.A.",
            shortName: "Movitel"
        };

    case "tmcel":
        return {
            name: "Moçambique Telecom, S.A.",
            shortName: "Tmcel"
        };
    }
};

export default get_network_operator_spec;