import React from "react";

const UserData = ({ users, handleRowClick, expandedGroups }) => {

    const groupedUsers = users.reduce((acc, curUser) => {
        const assetClass = curUser.asset_class;
        if (!acc[assetClass]) {
            acc[assetClass] = [];
        }
        acc[assetClass].push(curUser);
        return acc;
    }, {});

    return (
        <>
            {Object.entries(groupedUsers).map(([assetClass, usersInGroup]) => (
                <React.Fragment key={assetClass}>
                    <tr onClick={() => handleRowClick(assetClass)}>
                        <td colSpan="6" style={{color:"green", fontWeight: 'bold', cursor: 'pointer' }}>{assetClass}</td>
                    </tr>
                    {expandedGroups[assetClass] && usersInGroup.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.ticker}</td>
                            <td>{user.avg_price}</td>
                            <td>{user.market_price}</td>
                            <td>{user.market_value_ccy}</td>
                            <td>{user.latest_chg_pct}</td>
                        </tr>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
}

export default UserData;
