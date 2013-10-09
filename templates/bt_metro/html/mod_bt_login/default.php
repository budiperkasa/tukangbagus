<?php
/**
 * @package 	mod_bt_login - BT Login Module
 * @version		2.5.0
 * @created		April 2012
 * @author		BowThemes
 * @email		support@bowthems.com
 * @website		http://bowthemes.com
 * @support		Forum - http://bowthemes.com/forum/
 * @copyright	Copyright (C) 2011 Bowthemes. All rights reserved.
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */

// no direct access
defined('_JEXEC') or die('Restricted access');
?>
<div id="btl">
	<!-- Panel top -->	
	<div class="btl-panel">
		<?php if($type == 'logout') : ?>
		<!-- Profile button -->
		<div id="btl-panel-profile">
			<div class="btl-profile-getting">
				<div class="btl-user">
					<span class="btl-name">
					<?php
					if($params->get('name') == 0) : {
						echo $user->get('name');
					} else : {
						echo $user->get('username');
					} endif;
					?>
					</span>
					<?php
					echo JText::_("BTL_WELCOME_BT_METRO");
					?>
				</div>
			</div>
			
			<!-- Profile module -->
			<div id="btl-content-profile">
				<div class="btl-content-profile-inner">
					<div id="module-in-profile">
						<?php echo $loggedInHtml; ?>
					</div>
					<?php if($showLogout == 1):?>
					<div class="btl-buttonsubmit">
						<form action="<?php echo JRoute::_('index.php', true, $params->get('usesecure')); ?>" method="post" name="logoutForm">
							<button name="Submit" class="btl-buttonsubmit" onclick="document.logoutForm.submit();"><?php echo JText::_('JLOGOUT'); ?></button>
							<input type="hidden" name="option" value="com_users" />
							<input type="hidden" name="task" value="user.logout" />
							<input type="hidden" name="return" value="<?php echo $return; ?>" />
							<?php echo JHtml::_('form.token'); ?>
						
						</form>
					</div>
					<?php endif;?>
				</div>
			</div>
		</div> 
		<?php else : ?>
			<!-- Login button -->
			<span id="btl-panel-login" class="<?php echo $effect;?>">
				<span><?php echo JText::_('JLOGIN');?></span>
			</span><!-- Registration button --><?php if($enabledRegistration){
				$option = JRequest::getCmd('option');
				$task = JRequest::getCmd('task');
				if($option!='com_user' && $task != 'register' ){
			?><span id="btl-panel-registration" class="<?php echo $effect;?>"><span><?php echo JText::_('JREGISTER');?></span></span>
			<?php }
			} ?>
			
			
		<?php endif; ?>
	</div>
	<!-- content dropdown/modal box -->
	<div id="btl-content">
		<?php if($type == 'logout') { ?>
		
		<?php }else{ ?>	
		<!-- Form login -->	
		<div id="btl-content-login" class="btl-content-block">
			<?php if(JPluginHelper::isEnabled('authentication', 'openid')) : ?>
				<?php JHTML::_('script', 'openid.js'); ?>
			<?php endif; ?>
			
			<!-- if not integrated any component -->
			<?php if($integrated_com==''|| $moduleRender == ''){?>
			<form name="btl-formlogin" class="btl-formlogin" action="<?php echo JRoute::_('index.php', true, $params->get('usesecure')); ?>" method="post">
				<div id="btl-login-in-process"></div>	
				<h3><?php echo JText::_('TPL_BT_METRO_LOGIN_TO_YOUR_ACCOUNT') ?></h3>
				<?php if (JPluginHelper::isEnabled('system', 'remember')) : ?>
				<div class="btl-field">				
					<div class="" id="btl-input-remember">
						<input id="btl-checkbox-remember"  type="checkbox" name="remember"
							value="yes" />
							<?php echo JText::_('BT_REMEMBER_ME'); ?>
					</div>	
				</div>
				<div class="clear"></div>
				<?php endif; ?>
				
				<div class="btl-error" id="btl-login-error"></div>
				<div class="btl-field">
					<!--<div class="btl-label"><?php echo JText::_('MOD_BT_LOGIN_USERNAME') ?></div>-->
					<div class="btl-input">
						<input id="btl-input-username" type="text" value="<?php echo JText::_('MOD_BT_LOGIN_USERNAME') ?>" onfocus="if (this.value=='<?php echo JText::_('MOD_BT_LOGIN_USERNAME') ?>') this.value='';" onblur="if (this.value=='') this.value='<?php echo JText::_('MOD_BT_LOGIN_USERNAME') ?>';" name="username"	/>
					</div>
				</div>
				<div class="btl-field">
					<!--<div class="btl-label"><?php echo JText::_('MOD_BT_LOGIN_PASSWORD') ?></div>-->
					<div class="btl-input frm-login">
						<input id="btl-input-password" type="password" value="<?php echo JText::_('MOD_BT_LOGIN_PASSWORD') ?>" onfocus="if (this.value=='<?php echo JText::_('MOD_BT_LOGIN_PASSWORD') ?>') this.value='';" onblur="if (this.value=='') this.value='<?php echo JText::_('MOD_BT_LOGIN_PASSWORD') ?>';" name="password" alt="password" />
						<input type="submit" name="Submit" class="btl-buttonsubmit" onclick="return loginAjax()" value="<?php //echo JText::_('JLOGIN') ?>" /> 
					</div>
				</div>
				<div class="clear"></div>
				
				<?php if ($enabledRegistration) : ?>
					<div id="register-link">
						<?php echo sprintf(JText::_('DONT_HAVE_AN_ACCOUNT_YET'),'<a href="'.JRoute::_('index.php?option=com_users&view=registration').'">','</a>');?>

					</div>
				<?php endif; ?>
				<ul id ="bt_ul">
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_users&view=reset'); ?>">
					<?php echo JText::_('BT_FORGOT_YOUR_PASSWORD'); ?></a>
				</li>
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_users&view=remind'); ?>">
					<?php echo JText::_('BT_FORGOT_YOUR_USERNAME'); ?></a>
				</li>				
				</ul>
				
				<div class="btl-buttonsubmit">
					
					<input type="hidden" name="option" value="com_users" />
					<input type="hidden" name="task" value="user.login" /> 
					<input type="hidden" name="return" id="btl-return"	value="<?php echo $return; ?>" />
					<?php echo JHtml::_('form.token');?>
				</div>
			</form>	
			
			
		<!-- if integrated with one component -->
			<?php }else{ ?>
				<h3><?php echo JText::_('JLOGIN') ?></h3>
				<div id="btl-wrap-module"><?php  echo $moduleRender; ?></div>
				<?php }?>			
		</div>
		
		<?php if($enabledRegistration ){ ?>			
		<div id="btl-content-registration" class="btl-content-block">			
			<!-- if not integrated any component -->
			<?php if($integrated_com==''){?>	
						
				<form name="btl-formregistration" class="btl-formregistration"  autocomplete="off">
					<div id="btl-register-in-process"></div>	
					<h3><?php echo JText::_('CREATE_AN_ACCOUNT') ?></h3>
					<div id="btl-success"></div>
					
					<div class="btl-note"><span><?php echo JText::_("BTL_REQUIRED_FIELD"); ?></span></div>
					
					<div id="btl-registration-error" class="btl-error"></div>
					
					<div class="btl-field btl-field-name">
						<div class="btl-label"><?php echo JText::_( 'MOD_BT_LOGIN_NAME' ); ?></div>
						<div class="btl-input">
							<input id="btl-input-name" type="text" name="jform[name]" />
						</div>
					</div>
					<div id="btl-registration-name-error" class="btl-error-detail"></div>			
					<div class="clear"></div>
					
					<div class="btl-field btl-field-username">
						<div class="btl-label"><?php echo JText::_( 'MOD_BT_LOGIN_USERNAME' ); ?></div>
						<div class="btl-input">
							<input id="btl-input-username1" type="text" name="jform[username]"  />
						</div>
					</div>
					<div id="btl-registration-username-error" class="btl-error-detail"></div>
					<div class="clear"></div>
					
					<div class="btl-field btl-field-pass">
						<div class="btl-label"><?php echo JText::_( 'MOD_BT_LOGIN_PASSWORD' ); ?></div>
						<div class="btl-input">
							<input id="btl-input-password1" type="password" name="jform[password1]"  />
						</div>
					</div>
					<div id="btl-registration-pass1-error" class="btl-error-detail"></div>			
					<div class="clear"></div>
					
					<div class="btl-field btl-field-pass2">
						<div class="btl-label"><?php echo JText::_( 'MOD_BT_VERIFY_PASSWORD' ); ?></div>
						<div class="btl-input">
							<input id="btl-input-password2" type="password" name="jform[password2]"  />
						</div>
					</div>
					<div id="btl-registration-pass2-error" class="btl-error-detail"></div>
					<div class="clear"></div>
					
					<div class="btl-field btl-field-email">
						<div class="btl-label"><?php echo JText::_( 'MOD_BT_EMAIL' ); ?></div>
						<div class="btl-input">
							<input id="btl-input-email1" type="text" name="jform[email1]" />
						</div>
					</div>
					<div id="btl-registration-email1-error" class="btl-error-detail"></div>
					<div class="clear"></div>
				
					<div class="btl-field btl-field-email2">
						<div class="btl-label"><?php echo JText::_( 'MOD_BT_VERIFY_EMAIL' ); ?></div>
						<div class="btl-input">
							<input id="btl-input-email2" type="text" name="jform[email2]" />
						</div>
					</div>
					<div id="btl-registration-email2-error" class="btl-error-detail"></div>
					<div class="clear"></div>			
					<!-- add captcha-->
					<?php if($enabledRecaptcha=='recaptcha'){?>
					<div class="btl-field">
						<div class="btl-label"><?php echo JText::_( 'MOD_BT_CAPTCHA' ); ?></div>
						<div  id="recaptcha"><?php echo $reCaptcha;?></div>
					</div>
					<div id="btl-registration-captcha-error" class="btl-error-detail"></div>
					<div class="clear"></div>
					<!--  end add captcha -->
					<?php }?>
				
					<div class="btl-buttonsubmit">						
						<button type="submit" class="btl-buttonsubmit" onclick="return registerAjax()" >
							<?php //echo JText::_('JREGISTER');?>							
						</button>
						 
						<input type="hidden" name="task" value="register" /> 
						<?php echo JHtml::_('form.token');?>
					</div>
			</form>
			<!-- if  integrated any component -->
			<?php }else{ ?>
				<h3><?php echo JText::_("JREGISTER"); ?></h3>
				<iframe id="btl-iframe" width="850" height="500" frameborder="0" name="btl-iframe" src="<?php echo $linkOption?>"  ></iframe>			
			<?php }?>
		</div>
						
		<?php } ?>
	<?php } ?>
	
	</div>
	<div class="clear"></div>
</div>

<script type="text/javascript">
	var btlOpt = 
		{
			REQUIRED_FILL_ALL		: '<?php echo addslashes(JText::_("REQUIRED_FILL_ALL")); ?>',
			BT_AJAX					: '<?php echo JURI::getInstance()->toString(); ?>',
			BT_RETURN				: '<?php echo $return_decode; ?>',
			E_LOGIN_AUTHENTICATE	: "<?php echo addslashes(JText::_("E_LOGIN_AUTHENTICATE")); ?>",
			REQUIRED_NAME			:'<?php echo addslashes(JText::_("REQUIRED_NAME")); ?>',
			REQUIRED_USERNAME		: '<?php echo addslashes(JText::_("REQUIRED_USERNAME")); ?>',
			REQUIRED_PASSWORD		:'<?php echo addslashes(JText::_("REQUIRED_PASSWORD")); ?>',
			REQUIRED_VERIFY_PASSWORD:'<?php echo addslashes(JText::_("REQUIRED_VERIFY_PASSWORD")); ?>',
			PASSWORD_NOT_MATCH		:'<?php echo addslashes(JText::_("PASSWORD_NOT_MATCH")); ?>',
			REQUIRED_EMAIL			:'<?php echo addslashes(JText::_("REQUIRED_EMAIL")); ?>',
			EMAIL_INVALID			:'<?php echo addslashes(JText::_("EMAIL_INVALID")); ?>',	
			REQUIRED_VERIFY_EMAIL	:'<?php echo addslashes(JText::_("REQUIRED_VERIFY_EMAIL")); ?>',
			EMAIL_NOT_MATCH			:'<?php echo addslashes(JText::_("EMAIL_NOT_MATCH")); ?>',
			RECAPTCHA				:'<?php echo $enabledRecaptcha ;?>',
			LOGIN_TAGS				:'<?php echo $loginTag?>',
			REGISTER_TAGS			:'<?php echo $registerTag?>',
			EFFECT					:'<?php echo $effect?>',
			ALIGN					:'<?php echo $align?>',
			WIDTH_REGISTER_PANEL	: BTLJ("#btl-content-registration").outerWidth(),
			BG_COLOR				:'<?php echo $bgColor ;?>',
			MOUSE_EVENT				:'<?php echo $params->get('mouse_event','click') ;?>',
			TEXT_COLOR				:'<?php echo $textColor;?>'
		}
		if(btlOpt.ALIGN == "center"){
			BTLJ(".btl-panel").css('textAlign','center');
			BTLJ("#btl-content #btl-content-login,#btl-content #btl-content-registration, #btl-content #btl-content-profile").each(function(){
				var panelid = "#"+this.id.replace("content","panel");
				var content = this;
				BTLJ(window).load(function(){
				var left =	BTLJ(panelid).offset().left - jQuery('#btl').offset().left - (BTLJ(content).outerWidth()/2)+ (BTLJ(panelid).outerWidth()/2);
					BTLJ(content).css('left',left );
				})
			})
		}else{
			BTLJ(".btl-panel").css('float',btlOpt.ALIGN);
			BTLJ("#btl-content #btl-content-login,#btl-content #btl-content-registration, #btl-content #btl-content-profile").css(btlOpt.ALIGN,0);
			BTLJ("#btl-content #btl-content-login,#btl-content #btl-content-registration, #btl-content #btl-content-profile").css('top',BTLJ(".btl-panel").height()+1);
		}
		//BTLJ("input.btl-buttonsubmit,button.btl-buttonsubmit, #btl .btl-panel > span")
		//.css("background-color",btlOpt.BG_COLOR)
		//.css("color",btlOpt.TEXT_COLOR);
		//BTLJ("#btl .btl-panel > span").css("border",btlOpt.TEXT_COLOR);
</script>
