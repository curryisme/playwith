/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50716
 Source Host           : localhost:3306
 Source Schema         : game

 Target Server Type    : MySQL
 Target Server Version : 50716
 File Encoding         : 65001

 Date: 28/10/2021 22:22:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for games
-- ----------------------------
DROP TABLE IF EXISTS `games`;
CREATE TABLE `games`  (
  `gamesid` int(11) NOT NULL AUTO_INCREMENT,
  `gamestype` int(11) DEFAULT NULL,
  `gamesName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `gamesIco` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`gamesid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of games
-- ----------------------------
INSERT INTO `games` VALUES (1, 1, 'LOL', 'http://localhost:3001/public/icon/1.png');
INSERT INTO `games` VALUES (2, 2, '永劫无间', 'http://localhost:3001/public/icon/2.png');
INSERT INTO `games` VALUES (3, 3, 'Valorant DOTA2', 'http://localhost:3001/public/icon/3.png');
INSERT INTO `games` VALUES (4, 4, 'apex', 'http://localhost:3001/public/icon/4.png');
INSERT INTO `games` VALUES (5, 5, 'cod', 'http://localhost:3001/public/icon/5.png');
INSERT INTO `games` VALUES (6, 6, 'csgo', 'http://localhost:3001/public/icon/6.png');
INSERT INTO `games` VALUES (7, 7, 'overwatch', 'http://localhost:3001/public/icon/7.png');
INSERT INTO `games` VALUES (8, 8, 'pubg', 'http://localhost:3001/public/icon/8.png');
INSERT INTO `games` VALUES (9, 9, 'Rainbow6', 'http://localhost:3001/public/icon/9.png');
INSERT INTO `games` VALUES (10, 10, 'Steam小游戏', 'http://localhost:3001/public/icon/10.png');

-- ----------------------------
-- Table structure for peiwang
-- ----------------------------
DROP TABLE IF EXISTS `peiwang`;
CREATE TABLE `peiwang`  (
  `peiwanid` int(11) NOT NULL AUTO_INCREMENT,
  `pwgameType` int(11) DEFAULT NULL,
  `pwuserid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pwprice` decimal(10, 2) DEFAULT NULL,
  PRIMARY KEY (`peiwanid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of peiwang
-- ----------------------------
INSERT INTO `peiwang` VALUES (12, 1, 'ff111c32-387f-4743-809a-9d81177dc266', 130.00);
INSERT INTO `peiwang` VALUES (13, 2, 'ff111c32-387f-4743-809a-9d81177dc266', 40.00);
INSERT INTO `peiwang` VALUES (14, 7, 'ff111c32-387f-4743-809a-9d81177dc266', 60.00);
INSERT INTO `peiwang` VALUES (15, 3, '91675eBB-1deb-843d-a4d8983ebbf8', 40.00);
INSERT INTO `peiwang` VALUES (16, 5, '91675eBB-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (17, 1, '91675eBB-1deb-843d-a4d8983ebbf8', 50.00);
INSERT INTO `peiwang` VALUES (18, 7, '91675eBB-1deb-843d-a4d8983ebbf8', 60.00);
INSERT INTO `peiwang` VALUES (19, 9, '91675eBB-1deb-843d-a4d8983ebbf8', 40.00);
INSERT INTO `peiwang` VALUES (20, 1, '91675eBBB-1deb-843d-a4d8983ebbf8', 20.00);
INSERT INTO `peiwang` VALUES (21, 2, '91675eBBB-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (22, 10, '91675eBBB-1deb-843d-a4d8983ebbf8', 40.00);
INSERT INTO `peiwang` VALUES (23, 9, '91675eBBB-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (24, 6, '91675eBBB-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (25, 1, '916756a-1deb-843d-a4d8983ebbf8', 40.00);
INSERT INTO `peiwang` VALUES (26, 7, '916756a-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (27, 7, '91675e4a-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (28, 1, '91675e4a-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (29, 5, '91675e4a-1deb-843d-a4d8983ebbf8', 10.00);
INSERT INTO `peiwang` VALUES (30, 1, '91675ea-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (31, 5, '91675ea-1deb-843d-a4d8983ebbf8', 20.00);
INSERT INTO `peiwang` VALUES (32, 10, '91675ea-1deb-843d-a4d8983ebbf8', 50.00);
INSERT INTO `peiwang` VALUES (33, 1, '91675ead-12deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (34, 10, '91675ead-12deb-843d-a4d8983ebbf8', 40.00);
INSERT INTO `peiwang` VALUES (35, 8, '91675ead-12deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (36, 8, '91675ead-1deb-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (37, 1, '91675ead-1deb-843d-a4d8983ebbf8', 10.00);
INSERT INTO `peiwang` VALUES (38, 1, '91675ead-1deb-45e5-843d-a4d8983ebbf8', 30.00);
INSERT INTO `peiwang` VALUES (39, 3, '91675ead-1deb-45e5-843d-a4d8983ebbf8', 80.00);
INSERT INTO `peiwang` VALUES (40, 1, '5d9a3653-aa4c-46c0-b441-afa9643dbcf1', 26.00);
INSERT INTO `peiwang` VALUES (41, 7, '5d9a3653-aa4c-46c0-b441-afa9643dbcf1', 30.00);
INSERT INTO `peiwang` VALUES (42, 5, '5d9a3653-aa4c-46c0-b441-afa9643dbcf1', 17.00);
INSERT INTO `peiwang` VALUES (43, 1, '3ee55023-6c63-44b6-8e72-5e2fe4d068b4', 33.00);

-- ----------------------------
-- Table structure for pworder
-- ----------------------------
DROP TABLE IF EXISTS `pworder`;
CREATE TABLE `pworder`  (
  `pworderid` int(11) NOT NULL AUTO_INCREMENT,
  `pwordertime` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `pworderduration` decimal(10, 2) DEFAULT NULL,
  `pworderprice` decimal(10, 2) DEFAULT NULL,
  `pworderlaobanid` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `pworderpwid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pworderxm` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `pwordercreatetime` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `pworderflag` int(11) NOT NULL DEFAULT 0 COMMENT '0代表未审核 1代表已审核 2代表未通过',
  `pwinfo` varchar(2550) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `pworderlaobanUsername` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`pworderid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pworder
-- ----------------------------
INSERT INTO `pworder` VALUES (13, '2021-10-05', 3.00, 10.00, 'd600ce81-b87b-449b-8c7e-9a44748a64e2', '3ee55023-6c63-44b6-8e72-5e2fe4d068b4', '永劫无间', '2021-10-28 22:12', 1, '测试的，不用通过', 'zhangsanm');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `Id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userPwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userTel` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userEmail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userType` int(11) DEFAULT 1 COMMENT '1是陪玩 2是老板 3 是管理员',
  `userIntro` varchar(2550) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userImg` varchar(1055) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userCodeTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userSex` int(11) DEFAULT NULL,
  `userBrith` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userAudio` varchar(1055) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '声音路径',
  `userServer` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '服务范围',
  `userVoice` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '声音特点',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1111-1111-GUO', 'admin', '123456', '13414848633', '13414849536@163.com12', 3, '我要你的抱抱哦', 'http://localhost:3001/public/upload/1635341589293热爱105°的你.jpg', '624402', '1634566716136', 2, '2000-11-19', 'http://localhost:3001/public/upload/1 (1).aac', '英雄联盟', '温柔体贴');
INSERT INTO `user` VALUES ('91675eBB-1deb-843d-a4d8983ebbf8', '小姨', 'admin4', NULL, '13414849536@163.com9', 1, '我只喜欢顺其自然 周任务 婚纱10/10', 'http://localhost:3001/public/headimg/2.jpg', NULL, NULL, 1, '2000-11-19', 'http://localhost:3001/public/upload/1 (2).aac', '情定三生：招聘优质主持陪玩', '温柔体贴');
INSERT INTO `user` VALUES ('91675eBBB-1deb-843d-a4d8983ebbf8', 'zhangsan1', 'zhangsan1', NULL, '1123965937@qq.comk', 1, '等雾散，等雨停，等铁树开花，等你来爱我', 'http://localhost:3001/public/headimg/13.jpg', '754593', '1635426669343', 2, '2000-11-19', 'http://localhost:3001/public/upload/1 (3).aac', '梦屿千寻-招电脑接档主持', '温柔体贴');
INSERT INTO `user` VALUES ('916756a-1deb-843d-a4d8983ebbf8', 'zhangsan2', 'zhangsan2', NULL, '1123965933@qq.com', 1, '恰巧此时    两手空空    才无限拥有', 'http://localhost:3001/public/headimg/14.jpg', NULL, NULL, 1, '2000-11-19', 'http://localhost:3001/public/upload/1 (4).aac', '主接英雄联盟，steam小游戏', '各种服务各种服务');
INSERT INTO `user` VALUES ('91675e4a-1deb-843d-a4d8983ebbf8', 'zhangsan4', 'zhangsan4', NULL, '1123965934@qq.com', 1, '我希望正在读这句话的人 永远开心', 'http://localhost:3001/public/headimg/15.jpg', NULL, NULL, 1, '2000-11-19', 'http://localhost:3001/public/upload/1 (5).aac', '主接英雄联盟，steam小游戏', '各种服务各种服务');
INSERT INTO `user` VALUES ('91675ea-1deb-843d-a4d8983ebbf8', 'zhangsan3', 'zhangsan3', NULL, '1123965936@qq.com', 1, '最近江湖不好混了能不能借你被窝躲一躲', 'http://localhost:3001/public/headimg/16.jpg', NULL, NULL, 2, '2000-11-19', 'http://localhost:3001/public/upload/1 (6).aac', '主接英雄联盟，steam小游戏', '各种服务各种服务');
INSERT INTO `user` VALUES ('91675ead-12deb-843d-a4d8983ebbf8', 'benson', 'benson', '13444444442', '13414849539@163.com', 1, '总会遇到对的人说晚安', 'http://localhost:3001/public/headimg/7.jpg', NULL, NULL, 1, '2000-11-19', 'http://localhost:3001/public/upload/1 (7).aac', '主接英雄联盟，steam小游戏', '各种服务各种服务');
INSERT INTO `user` VALUES ('91675ead-1deb-333843d-a4d8983ebbf8', 'test', 'test', '13411111111', '134148495a6@163.com', 1, '浪宠儿↵', 'http://localhost:3001/public/headimg/8.jpg', NULL, NULL, 1, '2000-11-19', 'http://localhost:3001/public/upload/1 (8).aac', '主接英雄联盟，steam小游戏', '各种服务各种服务');
INSERT INTO `user` VALUES ('91675ead-1deb-843d-a4d8983ebbf8', 'admin454', 'admin454', '13444444445', '13414849536@163.com1', 1, '主接英雄联盟云顶S10赛季最强王者，会唱歌，支持存单。绝地时时长8000+主打栓狙，等一个满眼都是我的人。我必定满眼只有你，永劫云顶24小时接单', 'http://localhost:3001/public/headimg/9.jpg', NULL, NULL, 3, '2000-11-19', 'http://localhost:3001/public/upload/1 (9).aac', '主接英雄联盟，steam小游戏', '温柔体贴');
INSERT INTO `user` VALUES ('91675ead-1deb-45e5-843d-a4d8983ebbf8', 'zhangsan223', 'zhangsan223', NULL, '13414849536@163.com2', 1, '早呀，瑶瑶瑶瑶', 'http://localhost:3001/public/headimg/11.jpg', NULL, NULL, 1, '2021-10-05', 'http://localhost:3001/public/upload/1 (10).aac', '主接英雄联盟，steam小游戏', '温柔体贴');
INSERT INTO `user` VALUES ('5d9a3653-aa4c-46c0-b441-afa9643dbcf1', 'zhangsangg', 'zhangsangg', NULL, '13414849536@163.com3', 1, '保持知趣与清醒', 'http://localhost:3001/public/headimg/6.jpg', NULL, NULL, 1, '2021-10-13', 'http://localhost:3001/public/upload/1 (11).aac', '主接英雄联盟，steam小游戏', '温柔体贴');
INSERT INTO `user` VALUES ('d7e1a57d-95e6-452d-aad3-241d144cae48', 'zhangsandat', 'zhangsandat', NULL, '13414849536@163.com45', 1, '时间会告诉我们，简单的喜欢最长远，平凡的陪伴最心安，懂你的人最温暖', 'http://localhost:3001/public/headimg/4.jpg', NULL, NULL, 2, '2021-10-06', 'http://localhost:3001/public/upload/1 (12).aac', '主接英雄联盟，steam小游戏', '温柔体贴');
INSERT INTO `user` VALUES ('ff111c32-387f-4743-809a-9d81177dc266', 'zhangsansss', 'zhangsansss', NULL, '13414849536@163.com7', 1, '快来我的坏了', 'http://localhost:3001/public/headimg/5.jpg', NULL, NULL, 2, '2021-10-07', 'http://localhost:3001/public/upload/1 (1).aac', '主接英雄联盟，steam小游戏', '温柔体贴');
INSERT INTO `user` VALUES ('d600ce81-b87b-449b-8c7e-9a44748a64e2', 'zhangsanm', 'zhangsanm', '17899990000', '13414849536@163.com8', 2, 'zhangsanm', 'http://localhost:3001/public/headimg/3.jpg', NULL, NULL, 2, '2021-10-20', 'http://localhost:3001/public/upload/1 (8).aac', '专业服务', '专业服务');
INSERT INTO `user` VALUES ('3ee55023-6c63-44b6-8e72-5e2fe4d068b4', 'mytest', 'mytest', '', '1123965937@qq.com', 1, '介绍自己', 'http://localhost:3001/public/upload/1635430242201说散就散.jpg', '221923', '1635430298366', 1, '2015-10-07', 'http://localhost:3001/public/upload/16354302713491 (12).aac', '测试测试测试测试测试', '测试测试测试声音');

SET FOREIGN_KEY_CHECKS = 1;
