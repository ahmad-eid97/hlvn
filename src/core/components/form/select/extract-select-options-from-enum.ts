function extractSelectOptionsFromEnum(enumObj: any) {
    return Object.keys(enumObj).map((key, index) => {
        const rawLabel = enumObj[key];
        const label = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1);
        return {
            value: enumObj[key],
            label,
            selected: index === 0,
        };
    });
}

export default extractSelectOptionsFromEnum;
