import React from "react";
import { getIdFromUrl, hasValidValue } from "../../utils";
import LinkComponent from "./LinkComponent";

export default class AttributeValueComponent extends React.Component {
  render() {
    let value = Array.isArray(this.props.value)
      ? this.props.value.filter(hasValidValue) // if array filter the array for empty values
      : hasValidValue(this.props.value)
      ? this.props.value
      : null; // else consider only non empty values
    return (
      <>
        {Array.isArray(value)
          ? value.length != 0 &&
            value != undefined && (
              <tr>
                <td width="160px">{this.props.label}</td>
                <td>
                  <p>
                    {this.props.value.map((val) => {
                      if (typeof val == "string" && !val.includes("https")) {
                        return val + " ";
                      }
                      return (
                        <LinkComponent
                          type={this.props.type}
                          id={getIdFromUrl(val)}
                        />
                      );
                    })}
                  </p>
                </td>
              </tr>
            )
          : value != undefined && (
              <tr>
                <td width="150px">{this.props.label}</td>
                <td>
                  <p>{getIdFromUrl(value)}</p>
                </td>
              </tr>
            )}
      </>
    );
  }
}
