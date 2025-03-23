import { addLease } from '../db/queries/leases'; // 导入添加租约的函数

async function main() {
    // 定义要添加的租约数据
    const leaseData = {
        property_id: 10, // 替换为实际的 property_id
        tenant_email: 'bob@example.com', // 替换为实际的 tenant_id
        start_date: new Date(), // 当前日期
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 一年后
        rent_amount: 1200.00, // 租金金额
        deposit_amount: 1200.00, // 押金金额
        stage: 's1', // 初始阶段
        agreement_to_lease: 'todo url', // 是否同意租赁协议
    };

    try {
        // 调用添加租约的函数
        await addLease(leaseData);
        console.log('Lease added successfully.');
    } catch (error) {
        console.error('Error adding lease:', error);
    }
}

// 运行主函数
main();
