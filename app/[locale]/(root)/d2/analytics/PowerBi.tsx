"use client";
import { PowerBIEmbed } from "powerbi-client-react";
import React from "react";
import { models } from "powerbi-client";
const PowerBi = () => {
  return (
    <div className=" h-[90vh]">
      <PowerBIEmbed
        embedConfig={{
          type: "report",
          id: "8228240c-b128-46ce-bb54-c98b6859c53d",
          embedUrl:
            "https://app.powerbi.com/reportEmbed?reportId=8228240c-b128-46ce-bb54-c98b6859c53d&groupId=353f18ab-d9d5-4cc6-93cf-5b240a7847cc&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InE3UDFOdnh1R1F3RE4yVGFpTW92alo4YVp3cyIsImtpZCI6InE3UDFOdnh1R1F3RE4yVGFpTW92alo4YVp3cyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGJkNjY2NGQtNGViOS00NmViLTk5ZDgtNWM0M2JhMTUzYzYxLyIsImlhdCI6MTcxOTE4MzkxOSwibmJmIjoxNzE5MTgzOTE5LCJleHAiOjE3MTkxODk0NTUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFVeVpsOUR1ZEYzeGRERUdGWllqUnpMVjVENWtHUmdaK2tucmo5bHJFZzZCZ09VUXVrQjBqb2tRVy9CdWdlYUVxIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE5Ny4yMy43My4xMDciLCJuYW1lIjoieml0b3VuaXlhaHlhIiwib2lkIjoiYmUxYTg1NDItOWNlYS00ZGYxLWFhMDUtZjk5MzUzZWZkZTE3IiwicHVpZCI6IjEwMDMyMDAxOUU3MDI2QkUiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVFrQUFBQUFBQUFBd0FBQUFBQUFBQUFmQUhJLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6InVma1Q4cnlPZXZRaGZlU2dGclBwMk9oa1FyYVlFODBlMjBnNmRBdWpZTmciLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6InppdG91bml5YWh5YUBiZWphLnItaXNldC50biIsInVwbiI6InppdG91bml5YWh5YUBiZWphLnItaXNldC50biIsInV0aSI6IjQ2YTJjN0F0MzB1UWVBdGozWUZyQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfaWRyZWwiOiIxMiAxIn0.UzZIYJKNI7S9AIJYhfODhrXe4rIxIl34t7HEbSHHyamzAgHs3tZEZE6aXxkM2B4nQ-BBiPeCWd0FsuauisOitsIsVlieM6G7N1LGF3O2DGtNHWjXSeuUKW0t6HZfbg8dxuF4Uxvmf8A8yRyyPKcT_q8BDvgopuyvNac66py82wdtJaZkI7SW1GEBRbRAR4BlGNIBlNeOQbV_B_Dt1PxTqcaH2e-YEVpVTqfvrfLUP9YC-SOjExd9I5g1dhhO6imBqhBTDu-vis_5GpIM-C_OfwvPdhNumnNLTbeqQNPrM-zs8-TRn3Uv7bN-5jCUa6SS7Yb8T7lo_5d0fFaCz7KLEQ",
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: true,
              },
            },
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event: any) {
                console.log(event.detail);
              },
            ],
            ["visualClicked", () => console.log("visual clicked")],
            ["pageChanged", (event) => console.log(event)],
          ])
        }
        cssClassName={"reportClass h-[80vh] "}
        getEmbeddedComponent={(embeddedReport: any) => {
          window.Report = embeddedReport;
        }}
      />
    </div>
  );
};

export default PowerBi;
