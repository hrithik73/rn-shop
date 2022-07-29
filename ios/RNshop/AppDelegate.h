#import <React/RCTBridgeDelegate.h>
#import <UserNotifications/UNUserNotificationCenter.h>

#import <UIKit/UIKit.h>
#import <Firebase.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate,UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
