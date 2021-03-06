import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

import { useGlobalContext } from "./context";
import {
  Input,
  InputGroup,
  Button,
  Col,
  Navbar,
  Nav,
  NavItem,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardImg
} from "reactstrap";
import { Fade } from "react-animation-components";
import { Link } from "react-router-dom";
import '../../css/utilities.css'
import api from "../../api";
import Swal from "sweetalert2";
const Menu = (props) => {
  const [isRemoved, setIsRemove] = useState(false);
  if (props == null) return null;

  const { MenuID, MenuName, HomeCookName, Rating, MenuURL, MenuDescription, handleDelete, setSelectedMenu, Price, Servings } = props;
  function isImgLink(url) {
    if (typeof url !== 'string') return false;
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
  }

  if (isRemoved) return null; else
    return (
      <Col
        key={MenuID}
        sm={6}
        lg={4}
        style={{}}
        className="p-2 m-0">
        <Fade in>
          {setSelectedMenu == null ? <Card className="px-2 mx-1" style={{ boxShadow: '1px 2px 5px 0px #888888', backgroundColor: 'aliceblue', border: 'none', height: '100px' }} >
            <Link to={`/menu/${MenuID}`} style={{ height: '100%' }} >
              <CardBody className="row px-0 py-2 shadow-sm" style={{ height: '100%' }} >
                <Col lg={3} md={4} sm={3} xs={2} width="100%" style={{ height: '100%', padding: 'none' }} className="bg-light rounded p-0 mx-3">
                  <CardImg className="m-auto" top style={{ height: '100%', width: '100%' }} src={isImgLink(MenuURL) ? MenuURL :
                    "https://incucdep.com/wp-content/uploads/2019/03/mau-thiet-ke-menu-bang-phan2.jpg"}
                    alt="MenuIMG" />
                </Col>
                <Col style={{
                  width: "50%",
                  whiteSpace: "nowrap",
                  overflow: "hidden"
                }} lg={{ size: "auto" }} md={{ size: "auto" }} sm={{ size: "auto" }} xs={9}
                  className="mx-0 py-0 pb-1" >
                  <CardTitle className="text-dark p-0  m-0">
                    <strong>{MenuName}</strong>
                  </CardTitle>
                  <CardSubtitle tag="h6" className="mb-1 text-muted">{HomeCookName}</CardSubtitle>
                  <CardText tag="h6" className="mb-0 p-0 text-muted">${Price} <span className="" style={{ fontSize: '0.7rem' }}>{Servings} people</span> </CardText>
                  <ReactStars classNames="position-absolute"
                    style={{ width: '150%' }}
                    count={5}
                    value={Rating}
                    size={20}
                    isHalf={true}
                    edit={false}
                    activeColor="#ffd700"
                  />

                </Col>
              </CardBody>
            </Link>
            {handleDelete != null ?
              <div className="position-absolute fixed-bottom">
                <button onClick={() => { handleDelete(MenuID, () => { setIsRemove(true); }); }}
                  class="btn btn-outline-danger btn-lg rounded border-0 float-right nhover
            "
                  type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
              </div> : null
            }
          </Card > : <Card onClick={() => { setSelectedMenu(MenuID) }} className="p-0 " style={{ height: '100px' }} >

            <CardBody className="row p-2" style={{ height: '100%' }} >
              <Col lg={3} md={4} sm={3} xs={2} width="100%" style={{ height: '100%', padding: 'none' }} className="bg-light rounded p-0 mx-3">
                <CardImg className="m-auto" top style={{ height: '100%' }} src={isImgLink(MenuURL) ? MenuURL :
                  "https://incucdep.com/wp-content/uploads/2019/03/mau-thiet-ke-menu-bang-phan2.jpg"}
                  alt="MenuIMG" />
              </Col>
              <Col lg={{ size: "auto" }} md={{ size: "auto" }} sm={{ size: "auto" }} xs={9} className="mx-0 py-0">
                <CardTitle className="text-dark">
                  <strong>{MenuName}</strong>
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{HomeCookName}</CardSubtitle>
                <CardText>{Price}</CardText>
                <CardText>{Servings}</CardText>
                <ReactStars
                  count={5}
                  value={Rating}
                  size={24}
                  isHalf={true}
                  edit={false}
                  activeColor="#ffd700"
                  className="mb-2"
                />

              </Col>
            </CardBody>

            {handleDelete != null ?
              <div className="position-absolute fixed-bottom">
                <button onClick={() => { handleDelete(MenuID, () => { setIsRemove(true); }); }}
                  class="btn btn-outline-danger btn-lg rounded border-0 float-right nhover
            "
                  type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
              </div> : null
            }
          </Card >}

        </Fade >
      </Col >
    );
};
export default Menu;
