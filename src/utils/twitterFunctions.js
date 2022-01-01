import { transferAsset } from "./sdacFunctions";
export function parseTweetResp(data) {
    let keys = Object.keys(data)
    return keys.map(key => {
      return {
        twitterUser: key,
        bitcoinMusicUser: data[key][0].username,
        noOfTweets: data[key].length,
        amount: 0
      }
    })
  }


  export function runLoopTransfer(usersToReward, username, passwordKey, assetType) {
    let promises = []

    for (let index = 0; index < usersToReward.length; index++) {
      const user = usersToReward[index];

      promises.push(transferAsset(
        username,
        passwordKey.active,
        user.bitcoinMusicUser,
        user.amount + "",
        assetType,
        "Reward transfer"
      ))

    }

    return Promise.all(promises);
  }

