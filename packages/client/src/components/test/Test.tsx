import { Tabs, Card } from 'antd';

import TestForm from './TestForm';
import TestReduxCount from './TestReduxCount';
import TestSignIn from './TestSignIn';

export default function Test() {
  return (
    <Card title="Test space" style={{ margin: '20px' }}>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <Tabs.TabPane tab="sign in" key="1">
          <TestSignIn />
        </Tabs.TabPane>

        <Tabs.TabPane tab="form" key="2">
          <TestForm />
        </Tabs.TabPane>

        <Tabs.TabPane tab="redux count" key="3">
          <TestReduxCount />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}
