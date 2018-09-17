import * as React from 'react';

interface ImgProps extends React.ImgHTMLAttributes<{}> {
    readonly file: string;
}

export class Img extends React.Component<ImgProps> {
    static readonly getDefaultImgSrc = () => `/static/assets/no-image.png`;

    render() {
        const { file } = this.props;
        const imgSrc = file || Img.getDefaultImgSrc();

        const passedProps = { ...this.props, file: undefined };
        return <img style={{ maxWidth: '100%' }} {...passedProps} src={imgSrc} />;
    }
}