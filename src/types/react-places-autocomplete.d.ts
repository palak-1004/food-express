declare module "react-places-autocomplete" {
    import * as React from "react";

    interface Suggestion {
        description: string;
        placeId: string;
    }

    interface PlacesAutocompleteProps {
        value: string;
        onChange: (value: string) => void;
        onSelect: (value: string) => void;
        children: (props: {
            getInputProps: (options?: any) => any;
            suggestions: Suggestion[];
            getSuggestionItemProps: (suggestion: Suggestion) => any;
            loading: boolean;
        }) => React.ReactNode;
    }

    const PlacesAutocomplete: React.FC<PlacesAutocompleteProps>;

    export function geocodeByAddress(address: string): Promise<any[]>;
    export function getLatLng(result: any): Promise<{ lat: number; lng: number }>;

    export default PlacesAutocomplete;
}