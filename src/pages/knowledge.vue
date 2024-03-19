<template>
    <div class="flex flex-col max-h-screen">
        <t-navbar title="科普" :fixed="false" />

        <div class="flex-1 p-3 overflow-y-scroll">
            <t-collapse>
                <t-collapse-panel value="0" header="⚠️食物投喂注意事项">
                    <KnowledgeItem
                        color="rgb(177,57,51,.9)"
                        strokeColor="rgb(177,57,51)"
                        textColor="#fff"
                        emoji="📍"
                        content="食物应放在人少车少的隐蔽位置进行投喂，保证它的安全，给流浪猫足够的安全感。"
                    />

                    <KnowledgeItem
                        color="rgb(217,92,61,.9)"
                        strokeColor="rgb(217,92,61)"
                        textColor="#fff"
                        emoji="🚫"
                        content="喂粮的时候不要和流浪猫有亲密接触，比如摸它、抱它。流浪猫才不会丧失对人的警惕性，减少人为的伤害。亲密接触也可能导致流浪猫产生应激而生病。"
                    />

                    <KnowledgeItem
                        color="rgb(168,171,176,.9)"
                        strokeColor="rgb(168,171,176)"
                        textColor="#fff"
                        emoji="🍽️"
                        content="喂粮只喂七分饱，让流浪猫保有自行觅食的能力。"
                    />

                    <KnowledgeItem
                        color="rgb(78,166,240,.9)"
                        strokeColor="rgb(78,166,240)"
                        textColor="#fff"
                        emoji="💧"
                        content="用一次性筒状餐盒装水，放置于隐蔽处，比如短灌木丛中，人看不到，猫找得到。"
                    />

                    <KnowledgeItem
                        color="rgb(196,185,174,.9)"
                        strokeColor="rgb(196,185,174)"
                        textColor="#fff"
                        emoji="🍖"
                        content="尽量用猫干粮喂，因为湿粮容易招来蚊蝇,且猫干粮较为干燥，较好保存。"
                    />

                    <KnowledgeItem
                        color="rgb(110,137,171,.9)"
                        strokeColor="rgb(110,137,171)"
                        textColor="#fff"
                        emoji="🗑️"
                        content="投喂后应做好器具收纳以及垃圾清理，以免污染环境。"
                    />
                </t-collapse-panel>
            </t-collapse>

            <t-collapse>
                <t-collapse-panel value="0" header="🙅不建议投喂的食物">
                    <KnowledgeItem
                        color="rgb(150,114,94,.9)"
                        strokeColor="rgb(150,114,94)"
                        textColor="#fff"
                        emoji="🍞"
                        content="面包和米饭：猫咪作为纯正的肉食动物，其胃肠道对碳水化合物并不感冒，吸收利用率只有可怜的2%。所以即使猫咪吃饱了，也并不能使他们身体吸收到营养。"
                    />

                    <KnowledgeItem
                        color="rgb(133,99,85,.9)"
                        strokeColor="rgb(133,99,85)"
                        textColor="#fff"
                        emoji="🧄"
                        content="葱类、蒜、韭菜：含有破坏猫咪体内红细胞的成分，会引起贫血、血红蛋白尿、黄疸等疾病，过多食用后会导致猫咪死亡。"
                    />

                    <KnowledgeItem
                        color="rgb(193,192,190,.9)"
                        strokeColor="rgb(193,192,190)"
                        textColor="#fff"
                        emoji="🥛"
                        content="牛奶、奶制品：大部分的猫对乳糖不耐受，它们的消化系统不可以处理奶制品，所以如果给它们吃了会导致腹泻。"
                    />

                    <KnowledgeItem
                        color="rgb(178,108,135,.9)"
                        strokeColor="rgb(178,108,135)"
                        textColor="#fff"
                        emoji="🍇"
                        content="葡萄/葡萄干：吃葡萄干会导致呕吐、肾衰竭，虽然此毒性多发于狗狗身上，但美国动物保护协会建议由于其潜在的毒性，不建议给猫咪喂食。"
                    />

                    <KnowledgeItem
                        color="rgb(115,82,74,.9)"
                        strokeColor="rgb(115,82,74)"
                        textColor="#fff"
                        emoji="☕️"
                        content="酒水、咖啡、茶：会引发呕吐、腹泻和意识昏迷，对猫咪内脏造成负担，只要一点点便足够有杀伤力。"
                    />

                    <KnowledgeItem
                        color="rgb(191,139,90,.9)"
                        strokeColor="rgb(191,139,90)"
                        textColor="#fff"
                        emoji="🍲"
                        content="防腐剂食品：人类吃的剩菜剩饭，加了防腐剂的食品，加了调味料、盐以及熏、腌制食品。都有可能损伤猫咪消化器官。"
                    />
                </t-collapse-panel>
            </t-collapse>
            
            <!-- <p>📍食物应放在人少车少的隐蔽位置进行投喂，保证它的安全，给流浪猫足够的安全感。</p>
            <p>🚫喂粮的时候不要和流浪猫有亲密接触，比如摸它、抱它。流浪猫才不会丧失对人的警惕性，减少人为的伤害。亲密接触也可能导致流浪猫产生应激而生病。</p>
            <p>🍽️喂粮只喂七分饱，让流浪猫保有自行觅食的能力。</p>
            <p>💧用一次性筒状餐盒装水，放置于隐蔽处，比如短灌木丛中，人看不到，猫找得到。</p>
            <p>🍖尽量用猫干粮喂，因为湿粮容易招来蚊蝇,且猫干粮较为干燥，较好保存。</p>
            <p>🗑️投喂后应做好器具收纳以及垃圾清理，以免污染环境。</p> -->

            <div style="height: calc(70px);"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BlankListItem from '../components/blankListItem.vue'
import KnowledgeItem from '../components/knowledgeItem.vue'
</script>