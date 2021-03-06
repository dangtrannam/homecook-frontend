
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table
} from "reactstrap";
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Swal from "sweetalert2";
import Loading from "../items/Loading";
import api from "../../api";
import Pagination from '@material-ui/lab/Pagination';
import { Alert } from '@material-ui/lab';

function HomecookList() {
  let [homecooks, setHomecooks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  let [prevAccount, setprevAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("all");
  const handleChange = (event, value) => {
    if (value !== page) {
      setLoading(true);
      setPage(value);
    }
    console.log(page);
  }
  const countHomecooks = (username) => {
    api.getTotalSearchedAccount("homecook", username).then((res) => {
      setTotal(res);
    })
  };
  const fetchAccounts = (username) => {
    api.getSearchedAccount("homecook", username, page).then((res) => {
      setHomecooks(res);
      console.log(res);
    })
  }
  let stt = 0;
  const count = Math.ceil(total / 15);
  useEffect(() => {
    countHomecooks(search);
  }, [search]);
  useEffect(() => {
    fetchAccounts(search);
    setprevAccount(homecooks);
    setLoading(false);
  }, [search, page]);
  //--------
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "65%",
      backgroundColor: 'crimson'
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const styleActivate = {
    backgroundColor: 'crimson'
  }
  const styleDeActivate = {
    backgroundColor: 'green'
  }
  //--------
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const onClicked = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change the status!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.changeUserStatus(id, status).then((res) => {
          if (res.ok) {
            Swal.fire("Changed!", "The user status has been changed", "success");
            fetchAccounts(search);
            setprevAccount(homecooks);
          }
        })
      }
    })
  }
  return (
    <div className="featuredItem">
      <h2>Homecook List</h2>
      <div>
        <div class="search-form">
          <i class="fa fa-search search-icon" aria-hidden="true"></i>
          <input
            type="text"
            class="search-input"
            placeholder="User name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSearch(e.target.value == "" ? "all" : e.target.value);
              }
            }}
          />
        </div>
      </div>
      {
        homecooks?.length === 0 ? (
          <Alert variant="filled">
            <h3>HomeCook not found</h3>
          </Alert>
        ) : loading || homecooks === prevAccount ? (
          <Loading />
        )
          : (
            <Table striped hover style={{ fontSize: "15px" }}>
              <thead scope="row">
                <tr>
                  <th style={{ fontWeight: 'bold' }}>#</th>
                  <th style={{ fontWeight: 'bold' }}>Full name</th>
                  <th style={{ fontWeight: 'bold' }}>Address</th>
                  <th style={{ fontWeight: 'bold' }}>Phone number</th>
                  <th style={{ fontWeight: 'bold' }}>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  homecooks.map((homecook) => {
                    const {
                      UserID,
                      FullName,
                      Address,
                      PhoneNumber,
                      Email,
                      IsActive
                    } = homecook;
                    stt += 1;
                    return (
                      <tr key={Email}>
                        <td scope="row">{stt}</td>
                        <td>{FullName}</td>
                        <td>{Address}</td>
                        <td>{PhoneNumber}</td>
                        <td>{Email}</td>
                        {IsActive ?
                          <td>
                            <Button
                              variant="contained"
                              color="secondary"
                              className={classes.root}
                              style={styleActivate}
                              startIcon={<ErrorIcon />}
                              onClick={() => { onClicked(UserID, "False"); console.log({ IsActive }) }}
                            >
                              DeActivate
                            </Button>
                          </td> :
                          <td>
                            <Button
                              variant="contained"
                              color="primary"
                              style={styleDeActivate}
                              className={classes.root}
                              startIcon={<CheckCircleIcon />}
                              onClick={() => { onClicked(UserID, "True"); console.log({ IsActive }) }}
                            >
                              Activate
                            </Button>
                          </td>
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          )
      }
      <Pagination color="primary" variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
    </div>
  );
}

export default HomecookList;