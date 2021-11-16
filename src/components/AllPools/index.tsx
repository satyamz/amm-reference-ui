import { useEffect, useState } from "react";
import { Heading4 } from "@stellar/design-system";
import { Avatar } from "components/Avatar";
import { Card } from "components/Card";
import { SortableTable } from "components/SortableTable";
import { formatAmount } from "helpers/formatAmount";
import { getPoolName } from "helpers/getPoolName";
import { AssetAvatar, LiquidityPoolDetails } from "types/types.d";

import "./styles.scss";

interface AllPoolsProps {
  aggregatedPoolData: LiquidityPoolDetails[];
}

interface PoolTableData {
  assetAvatars: AssetAvatar[];
  assetCodes: string[];
  href: string;
  name: string;
  liquidity: string;
  fees: string[];
}

export const AllPools = ({ aggregatedPoolData }: AllPoolsProps) => {
  const [poolTableData, setPoolTableData] = useState([] as PoolTableData[]);

  useEffect(() => {
    setPoolTableData(
      [...aggregatedPoolData].map(
        ({ assetAvatars, assetCodes, earnedFees, id, totalShares }) => ({
          assetAvatars,
          assetCodes,
          href: `pool/${id}`,
          name: getPoolName(assetCodes),
          liquidity: totalShares,
          fees: [`${earnedFees[0].all_time}`, `${earnedFees[0].all_time}`],
        }),
      ),
    );
  }, [aggregatedPoolData]);

  const labels = [
    {
      id: "name",
      label: "Name",
      sortBy: true,
    },
    {
      id: "liquidity",
      label: "Liquidity",
      sortBy: true,
    },
    {
      id: "fees[0]",
      label: "Fees (24HR)",
      sortBy: true,
    },
    {
      id: "fees[1]",
      label: "Fees (24HR)",
      sortBy: true,
    },
  ];

  const renderItemRow = ({
    assetAvatars,
    assetCodes,
    name,
    liquidity,
    fees,
  }: PoolTableData) => (
    <>
      <td className="AllPools__row">
        <Avatar source={assetAvatars} size="1.5rem" />
        {name}
      </td>
      <td>{formatAmount(liquidity)}</td>
      <td>
        {formatAmount(fees[0])} {assetCodes[0]}
      </td>
      <td>
        {formatAmount(fees[1])} {assetCodes[1]}
      </td>
    </>
  );

  return (
    <div className="Section AllPools">
      <Heading4>All Liquidity Pools</Heading4>
      <Card>
        <SortableTable
          data={poolTableData}
          columnLabels={labels}
          renderItemRow={renderItemRow}
          pageSize={10}
        />
      </Card>
    </div>
  );
};
