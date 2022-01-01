import React, {useEffect, useState} from 'react';
import CustomDialog from "../helperComponents/customDialog";
import TransferContent from "./transferContent";
import Button from "../helperComponents/customButton";
import {useDispatch, useSelector} from "react-redux";
import {setLoader} from "../../redux/actions/flagActions";
import {transferAsset} from "../../utils/sdacFunctions";
import {snackbar} from "../helperComponents/snackbar";
import * as sdac from "museblockchain-js";
import {getMyNfts, setMyNfts} from "../../redux/actions/nftActions";
import {translationAPI} from "../../apis/translation";

const TransferDialog = ({
                          open,
                          onClose,
                          balance,
                          assetType,
                        }) => {
  const [platform, setPlatform] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');
  const [errors, setErrors] = useState({});
  const isLoading = useSelector(state => state.flags.isLoading);
  const privateKeys = useSelector(state => state.cred.privateKeys);
  const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();

  useEffect(() => {
    if (amount >= 0 && amount <=balance) {
      setErrors({...errors, amount: ''})
    } else {
      setErrors({...errors, amount: 'Insufficient Balance'})
    }
  }, [amount]);

  const checkErrors = () => {
    let flag = false;
    Object.keys(errors).map(key => {
      if (errors[key]) {
        flag = true;
      }
    });
    return flag;
  }

  const transferCall = (translatedTransferTo) => {
    transferAsset(username, privateKeys.active, translatedTransferTo, amount, assetType, memo)
      .then(response => {
        if (response) {
          snackbar.success('Successfully Transferred!', 5000)
          onClose();
        }
      })
      .catch(error => {
        snackbar.error('Transferring failed. You need to stake more xHashtag to increase bandwidth');
        dispatch(setLoader(false));
      });
  };

  const onTransfer = (e) => {
    e.preventDefault();
    dispatch(setLoader(true));
    if (platform !== 'blockchain') {
      translationAPI({ username: transferTo, platform })
        .then(response => {
          if (response && response.data) {
            const { username: translatedTransferTo = '' } = response.data;
            if (translatedTransferTo) {
              transferCall(translatedTransferTo);
            }
          } else {
            snackbar.error("Translation failed");
          }
        })
        .catch(error => {
          snackbar.error(error?.response?.data?.message || "Translation failed");
          dispatch(setLoader(false));
        });
    } else {
      transferCall(transferTo.toLowerCase());
    }
  };

  const content = () => <TransferContent
    platform={platform}
    transferTo={transferTo}
    amount={amount}
    memo={memo}
    balance={balance}
    errors={errors}
    setPlatform={setPlatform}
    setTransferTo={setTransferTo}
    setAmount={setAmount}
    setMemo={setMemo}
    setErrors={setErrors}
  />;

  const actions = () => <Button
    type="submit"
    fullWidth
    variant="contained"
    disabled={isLoading || !(platform && transferTo && amount) || checkErrors()}
  >
    {isLoading ? 'Please wait...' : 'Transfer'}
  </Button>

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title={'Transfer'}
      content={content()}
      actions={actions()}
      onFormSubmit={onTransfer}
    />
  );

};

export default TransferDialog;