import {
  RequestType as RT,
  RequestState as RS,
} from "@modules/common/requests";
import { slice, initialState } from "./slice";

const { reducer, actions } = slice;

describe("todo slice", () => {
  describe("reducer, actions, selectors", () => {
    it("should return the initial state on first run", () => {
      // Arrange
      const nextState = initialState;

      // Act
      const result = reducer(undefined, { type: "" });

      // Assert
      expect(result).toEqual(nextState);
    });

    describe("loading", () => {
      it("should start loading request on start", () => {
        // Arrange
        const nextState = initialState;

        // Act
        const result = reducer(undefined, { type: "" });

        // Assert
        expect(result).toEqual(nextState);
        // loading.data
        expect(result.loading.data.length).toEqual(0);
        // loading.request
        expect(result.loading.request.payload).toBeUndefined();
        expect(result.loading.request.type).toEqual(RT.read);
        expect(result.loading.request.state).toEqual(RS.inProgress);
      });

      it("correctly fills in entities after successful request", () => {
        // Arrange
        const payload = [
          {
            id: 0.30673463111541177,
            completed: true,
            text: "Todo 3.",
          },
          {
            id: 0.22126505210584257,
            completed: true,
            text: "Todo 4.",
          },
          {
            id: 0.5823614201227101,
            completed: false,
            text: "Todo 8.",
          },
        ];

        // Act
        const result = reducer(initialState, actions.loadDone(payload));

        // Assert
        expect(result.loading.request.type).toEqual(RT.read);
        expect(result.loading.request.state).toEqual(RS.success);
        // payload
        expect(Object.values(result.entities).length).toEqual(3);
        expect(result.entities[payload[0].id]).toBeDefined();
        const { data, request } = result.entities[payload[0].id];
        // data
        expect(data.id).toEqual(payload[0].id);
        expect(data.text).toEqual(payload[0].text);
        expect(data.completed).toEqual(payload[0].completed);
        // request
        expect(request.type).toEqual(RT.read);
        expect(request.state).toEqual(RS.success);
      });

      it("correctly fills in error fields after request error", () => {
        // Arrange

        // Act
        const result = reducer(initialState, actions.loadError());

        // Assert
        expect(result.loading.request.type).toEqual(RT.read);
        expect(result.loading.request.state).toEqual(RS.error);
      });
    });
  });
});
