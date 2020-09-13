import React from 'react';

interface Props {
    text: string;
}

const ErrorNotifier: React.FunctionComponent<Props> = (props: Props) => {
    return <div style={{ padding: '.7em 0' }}>{props.text}</div>;
};

export default ErrorNotifier;
