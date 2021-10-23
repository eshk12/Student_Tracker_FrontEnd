import React from "react"
import {Row, Col, Card, CardText, CardBody} from "reactstrap";

const Widget = ({statistics}) => {
    return (
        <React.Fragment>
            {
                statistics.map((item, key) => {
                    return (
                        <Col md={6} xl={3} key={key}>
                            <Card outline color="primary">
                                <CardBody>
                                    <Row>
                                        <Col lg={9}>
                                            <h4 className="card-title mb-2">
                                                {item.title}
                                            </h4>
                                            <CardText>
                                                <h5>{item.count}</h5>
                                            </CardText>
                                        </Col>
                                        <Col lg={3}>
                                            <h3 className="mt-0 mb-4 text-primary">
                                                <i className={item.icon}></i>
                                            </h3>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })
            }

        </React.Fragment>
    )
}
export default Widget