import * as sdac from "museblockchain-js";
import { ASSETS } from "../environments/assetsConfig";
export async function transferAsset(username, password, transferTo, amount, assetId, memo) {
    // if precession is not in asset then give it 0
    let amountInUnits = amount * Math.pow(10, ASSETS[assetId] ? ASSETS[assetId].precision : 0);

    return new Promise(function (resolve, reject) {
      sdac.transferFundsByAsset(
        username,
        password,
        transferTo,
        amountInUnits,
        assetId,
        memo,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            resolve(success);
          }
        }
      );
    });
  }