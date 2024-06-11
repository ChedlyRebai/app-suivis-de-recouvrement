"use client";
import { PowerBIEmbed } from "powerbi-client-react";
import React from "react";
import { models } from "powerbi-client";
const Co = () => {
  return (
    <div className=" h-[90vh]">
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
          id: "8228240c-b128-46ce-bb54-c98b6859c53d",
          embedUrl:
            "https://app.powerbi.com/reportEmbed?reportId=8228240c-b128-46ce-bb54-c98b6859c53d&groupId=353f18ab-d9d5-4cc6-93cf-5b240a7847cc&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
          accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGJkNjY2NGQtNGViOS00NmViLTk5ZDgtNWM0M2JhMTUzYzYxLyIsImlhdCI6MTcxODA2MDYxMywibmJmIjoxNzE4MDYwNjEzLCJleHAiOjE3MTgwNjU2MjYsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUE1WXczYStlYWxyVE8rUk9OVXpVY3l1dFhmNFlFdEgwQTl5UWV4ZkNuUER1Sks4dEk4UzM2bDFwazRaWW5lTDlVIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE5Ny4wLjE0MS4yNDIiLCJuYW1lIjoieml0b3VuaXlhaHlhIiwib2lkIjoiYmUxYTg1NDItOWNlYS00ZGYxLWFhMDUtZjk5MzUzZWZkZTE3IiwicHVpZCI6IjEwMDMyMDAxOUU3MDI2QkUiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVFrQUFBQUFBQUFBd0FBQUFBQUFBQUFmQUhJLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6InVma1Q4cnlPZXZRaGZlU2dGclBwMk9oa1FyYVlFODBlMjBnNmRBdWpZTmciLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6InppdG91bml5YWh5YUBiZWphLnItaXNldC50biIsInVwbiI6InppdG91bml5YWh5YUBiZWphLnItaXNldC50biIsInV0aSI6IlRWQXVVYnJpcEV5TjBiOW1TZUlYQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.FGJ1JeQop0Kt8hK1EbsO3ZLHjfJoaAmSPhlLxpxpYylhz0OzI1NaF_wZt0MHSwpx7ys1bgLBRGeEOuuIrTdF2KzOlQVrYT_xd9OpuyeyGshASEwq65e90qRuUfJoWbPrvAmchdNSUvdTS5UbFLTtYQU8r5u5tZKt2a3oWKzC3zBOsw4v6OuEpSw6CnJmSMf24uxXksy4Ag-OIHFtbwUc8b0jhWfsV_OGO7tgwQtUsOdb-g-98Uqtynb5W4naFA8GIlzl-3GJrW2NufPYeU5IGTmpsagZQj-3ZpXRsJlonKfoTvk8H05ZIBv0mxK3CqpSPj8iiitZu2AQboUhA9qb6A",
          tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
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

export default Co;
